import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Container,
  Modal,
  Spinner,
  Table,
} from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import LoggedIn from "../../../LoggedIn";
import firebase from "../../../../context/Firebase";
import WarehouseMapModal from "../../../../components/WarehouseMapModal";
import storageUnitDetail from "../../../../lib/inventory/storageUnitDetail.cjs";
import styles from "../../../../styles/StorageUnitDetail.module.css";

const {
  STORAGE_UNIT_COLLECTION,
  STORAGE_UNIT_PHOTO_ROOT,
  getMembershipEqualityValues,
  getParentPalletSummary,
  getStorageLocationSummary,
  groupPalletContents,
  mergeCurrentAndLegacyMembershipRecords,
  normalizeStorageUnitId,
  storageUnitNumber,
  storageUnitType,
} = storageUnitDetail;

const naturalCollator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});
const MAX_PHOTO_BYTES = 20 * 1024 * 1024;

function firstQueryValue(value) {
  return Array.isArray(value) ? value[0] : value;
}

function displayValue(value) {
  if (Array.isArray(value)) {
    const values = value
      .map((entry) => String(entry ?? "").trim())
      .filter(Boolean);
    return values.length ? values.join(", ") : "-";
  }
  const text = String(value ?? "").trim();
  return text || "-";
}

function mapItemDocument(document) {
  const data = document.data() || {};
  return {
    id: document.id,
    ...data,
    name: displayValue(data.name),
    pnDisplay: displayValue(data.pn),
    snDisplay: displayValue(data.sn),
    localSNDisplay: displayValue(data.localSN || data.local_sn || document.id),
    hidden: data.visible === false,
    newLocalCurrent:
      data.newLocalCurrent && typeof data.newLocalCurrent === "object"
        ? data.newLocalCurrent
        : {},
  };
}

function sortItems(items) {
  return [...items].sort((left, right) => {
    const byName = naturalCollator.compare(left.name, right.name);
    return byName || naturalCollator.compare(left.id, right.id);
  });
}

function mapSelectionFromLocation(location, unitId, parentPalletId = "") {
  if (!location?.complete) return null;
  const type = storageUnitType(unitId);
  const number = String(storageUnitNumber(unitId) || "");
  return {
    region: location.region,
    sectionLetter: location.section.letter,
    sectionNumber: location.section.number,
    pallet:
      type === "pallet"
        ? number
        : parentPalletId
        ? String(storageUnitNumber(parentPalletId) || "")
        : "",
    bin: type === "bin" ? number : "",
  };
}

function ItemsTable({ items, title, emptyMessage }) {
  return (
    <section className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <div>
          <h2>{title}</h2>
          <p>
            {items.length} current item{items.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>
      <div className={styles.tableWrap}>
        <Table bordered hover responsive className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>PN</th>
              <th>SN</th>
              <th>Local SN</th>
              <th>Visibility</th>
              <th>Open</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className={styles.itemName}>{item.name}</td>
                <td>{item.pnDisplay}</td>
                <td>{item.snDisplay}</td>
                <td>{item.localSNDisplay}</td>
                <td>
                  {item.hidden ? (
                    <Badge bg="secondary">Hidden</Badge>
                  ) : (
                    <Badge bg="success">Visible</Badge>
                  )}
                </td>
                <td>
                  <Link
                    href={`/NewSearch/item/${encodeURIComponent(item.id)}`}
                    className={styles.openLink}
                  >
                    Open item
                  </Link>
                </td>
              </tr>
            ))}
            {!items.length && (
              <tr>
                <td colSpan={6} className={styles.emptyState}>
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </section>
  );
}

async function fetchPhotos(unitId) {
  const result = await firebase
    .storage()
    .ref()
    .child(`${STORAGE_UNIT_PHOTO_ROOT}/${unitId}`)
    .listAll();
  const references = [...result.items].sort((left, right) =>
    naturalCollator.compare(left.name, right.name)
  );
  return Promise.all(
    references.map(async (reference) => ({
      storageName: reference.name,
      url: await reference.getDownloadURL(),
    }))
  );
}

export default function StorageUnitDetailPage() {
  const router = useRouter();
  const unitId = useMemo(
    () =>
      router.isReady
        ? normalizeStorageUnitId(firstQueryValue(router.query.id))
        : "",
    [router.isReady, router.query.id]
  );
  const unitType = storageUnitType(unitId);
  const unitNumber = storageUnitNumber(unitId);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const [unit, setUnit] = useState(null);
  const [items, setItems] = useState([]);
  const [linkedBinIds, setLinkedBinIds] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [deletingPhoto, setDeletingPhoto] = useState("");
  const [activePhoto, setActivePhoto] = useState(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const [printError, setPrintError] = useState("");
  const [printSuccess, setPrintSuccess] = useState("");
  const [showLabelPreview, setShowLabelPreview] = useState(false);
  const [labelPreview, setLabelPreview] = useState(null);
  const [labelPreviewError, setLabelPreviewError] = useState("");
  const [labelPreviewLoading, setLabelPreviewLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [mapSelection, setMapSelection] = useState(null);

  useEffect(() => {
    if (!router.isReady) return undefined;
    if (!unitId) {
      setUnit(null);
      setItems([]);
      setLinkedBinIds([]);
      setPhotos([]);
      setLoadError("This storage-unit ID is invalid.");
      setIsLoading(false);
      return undefined;
    }

    let cancelled = false;
    const load = async () => {
      setIsLoading(true);
      setLoadError("");
      setPhotoError("");
      setPrintError("");
      setPrintSuccess("");
      try {
        const db = firebase.firestore();
        const locationField =
          unitType === "bin"
            ? "newLocalCurrent.bin"
            : "newLocalCurrent.pallet";
        const legacyLocationField = unitType === "bin" ? "bin" : "pallet";
        const legacyUpperLocationField = unitType === "bin" ? "Bin" : "Pallet";
        const equalityValues = getMembershipEqualityValues(unitId);
        const linkedBinsPromise =
          unitType === "pallet"
            ? db
                .collection(STORAGE_UNIT_COLLECTION)
                .where("parentPalletId", "==", unitId)
                .get()
            : Promise.resolve({ docs: [] });
        const [
          unitSnapshot,
          itemSnapshot,
          legacyItemSnapshot,
          legacyUpperItemSnapshot,
          linkedBinsSnapshot,
        ] = await Promise.all([
          db.collection(STORAGE_UNIT_COLLECTION).doc(unitId).get(),
          db.collection("Test").where(locationField, "in", equalityValues).get(),
          db
            .collection("Test")
            .where(legacyLocationField, "in", equalityValues)
            .get(),
          db
            .collection("Test")
            .where(legacyUpperLocationField, "in", equalityValues)
            .get(),
          linkedBinsPromise,
        ]);
        if (cancelled) return;
        if (!unitSnapshot.exists) {
          setUnit(null);
          setItems([]);
          setLinkedBinIds([]);
          setPhotos([]);
          setLoadError(`${unitId} does not have a storage-unit record yet.`);
          return;
        }

        const nextItems = sortItems(
          mergeCurrentAndLegacyMembershipRecords({
            currentRecords: itemSnapshot.docs.map(mapItemDocument),
            legacyLowerRecords: legacyItemSnapshot.docs.map(mapItemDocument),
            legacyUpperRecords: legacyUpperItemSnapshot.docs.map(mapItemDocument),
            membershipField: legacyLocationField,
          })
        );
        setUnit({ id: unitSnapshot.id, ...(unitSnapshot.data() || {}) });
        setItems(nextItems);
        setLinkedBinIds(
          linkedBinsSnapshot.docs
            .map((document) => normalizeStorageUnitId(document.id))
            .filter((id) => storageUnitType(id) === "bin")
            .sort((left, right) => naturalCollator.compare(left, right))
        );

        try {
          const loadedPhotos = await fetchPhotos(unitId);
          if (!cancelled) setPhotos(loadedPhotos);
        } catch (error) {
          console.warn(`Storage-unit photos could not be loaded for ${unitId}`, error);
          if (!cancelled) {
            setPhotos([]);
            setPhotoError("Pictures could not be loaded. You can retry by refreshing the page.");
          }
        }
      } catch (error) {
        console.error("Failed to load storage unit", error);
        if (!cancelled) {
          setUnit(null);
          setItems([]);
          setLinkedBinIds([]);
          setPhotos([]);
          setLoadError(error?.message || "The storage unit could not be loaded.");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [router.isReady, unitId, unitType]);

  const locationSummary = useMemo(
    () => getStorageLocationSummary(unit || {}, items),
    [items, unit]
  );
  const parentSummary = useMemo(
    () =>
      unitType === "bin"
        ? getParentPalletSummary(unit || {}, items)
        : {
            status: "none",
            parentPalletId: "",
            candidates: [],
          },
    [items, unit, unitType]
  );
  const palletContents = useMemo(
    () => groupPalletContents(items),
    [items]
  );
  const palletBinGroups = useMemo(() => {
    const groups = new Map(
      palletContents.bins.map((bin) => [bin.id, bin.items])
    );
    linkedBinIds.forEach((binId) => {
      if (!groups.has(binId)) groups.set(binId, []);
    });
    return Array.from(groups.entries())
      .map(([id, groupedItems]) => ({ id, items: groupedItems }))
      .sort((left, right) => naturalCollator.compare(left.id, right.id));
  }, [linkedBinIds, palletContents.bins]);
  const storedType = String(unit?.type || unit?.kind || "")
    .trim()
    .toLowerCase();
  const storedTypeMismatch =
    Boolean(storedType) && storedType !== unitType;

  const reloadPhotos = async () => {
    if (!unitId) return;
    setPhotoError("");
    try {
      setPhotos(await fetchPhotos(unitId));
    } catch (error) {
      console.error("Failed to reload storage-unit pictures", error);
      setPhotoError("Pictures could not be reloaded.");
    }
  };

  const uploadSelectedPhotos = async (event) => {
    const input = event.target;
    const selectedFiles = Array.from(input.files || []);
    input.value = "";
    if (!selectedFiles.length || !unitId) return;

    const invalidFile = selectedFiles.find(
      (file) =>
        !String(file.type || "").toLowerCase().startsWith("image/") ||
        file.size > MAX_PHOTO_BYTES
    );
    if (invalidFile) {
      setPhotoError(
        "Choose image files no larger than 20 MB each. No pictures were uploaded."
      );
      return;
    }

    setIsUploading(true);
    setPhotoError("");
    try {
      const root = firebase.storage().ref();
      const uploadStartedAt = Date.now();
      for (let index = 0; index < selectedFiles.length; index += 1) {
        const file = selectedFiles[index];
        const safeName = String(file.name || `photo-${index}.jpg`).replace(
          /[^a-zA-Z0-9._-]/g,
          "_"
        );
        const storageName = `${uploadStartedAt}-${index}-${safeName}`;
        await root
          .child(`${STORAGE_UNIT_PHOTO_ROOT}/${unitId}/${storageName}`)
          .put(file, {
            contentType: file.type,
            cacheControl: "public,max-age=31536000,immutable",
          });
      }
      await reloadPhotos();
    } catch (error) {
      console.error("Failed to upload storage-unit pictures", error);
      setPhotoError(error?.message || "The pictures could not be uploaded.");
    } finally {
      setIsUploading(false);
    }
  };

  const deletePhoto = async (photo) => {
    if (!photo?.storageName || !unitId || deletingPhoto) return;
    const confirmed = window.confirm(
      `Delete this picture from ${unitId}? This cannot be undone.`
    );
    if (!confirmed) return;

    setDeletingPhoto(photo.storageName);
    setPhotoError("");
    try {
      const idToken = await firebase.auth().currentUser?.getIdToken();
      if (!idToken) throw new Error("Sign in again before deleting this picture.");
      const response = await fetch("/api/storage-units/delete-image", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          unitId,
          storageName: photo.storageName,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result?.error || "The picture could not be deleted.");
      }
      if (activePhoto?.storageName === photo.storageName) setActivePhoto(null);
      await reloadPhotos();
    } catch (error) {
      console.error("Failed to delete storage-unit picture", error);
      setPhotoError(error?.message || "The picture could not be deleted.");
    } finally {
      setDeletingPhoto("");
    }
  };

  const printLabel = async () => {
    if (!unitId || isPrinting) return;
    setIsPrinting(true);
    setPrintError("");
    setPrintSuccess("");
    try {
      const idToken = await firebase.auth().currentUser?.getIdToken();
      if (!idToken) throw new Error("Sign in again before printing this label.");
      const response = await fetch("/api/print/storage-label", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ unitId }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result?.ok === false) {
        throw new Error(result?.error || "The storage label could not be printed.");
      }
      setPrintSuccess(`${unitId} was sent to the label printer.`);
    } catch (error) {
      console.error("Failed to print storage-unit label", error);
      setPrintError(error?.message || "The storage label could not be printed.");
    } finally {
      setIsPrinting(false);
    }
  };

  const previewLabel = async () => {
    if (!unitId || labelPreviewLoading) return;
    setShowLabelPreview(true);
    setLabelPreviewError("");
    if (labelPreview?.unitId === unitId) return;

    setLabelPreviewLoading(true);
    try {
      const idToken = await firebase.auth().currentUser?.getIdToken();
      if (!idToken) throw new Error("Sign in again before previewing this label.");
      const response = await fetch(
        `/api/print/storage-label-preview?unitId=${encodeURIComponent(unitId)}`,
        {
          headers: { Authorization: `Bearer ${idToken}` },
        }
      );
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result?.ok === false) {
        throw new Error(result?.error || "The label preview could not be generated.");
      }
      setLabelPreview(result);
    } catch (error) {
      console.error("Failed to preview storage-unit label", error);
      setLabelPreview(null);
      setLabelPreviewError(
        error?.message || "The label preview could not be generated."
      );
    } finally {
      setLabelPreviewLoading(false);
    }
  };

  const openMapAtLocation = (location) => {
    const selection = mapSelectionFromLocation(
      location,
      unitId,
      parentSummary.parentPalletId
    );
    if (!selection) return;
    setMapSelection(selection);
    setShowMap(true);
  };

  const viewInventorySelection = (selection = {}) => {
    const params = new URLSearchParams();
    Object.entries({
      region: selection.region,
      sectionLetter: selection.sectionLetter,
      sectionNumber: selection.sectionNumber,
      pallet: selection.pallet,
      bin: selection.bin,
    }).forEach(([key, value]) => {
      if (value !== undefined && value !== null && String(value).trim()) {
        params.set(key, String(value));
      }
    });
    if (selection.pallet !== undefined && String(selection.pallet || "").trim()) {
      params.set("palletLocationScope", "current");
    }
    if (selection.bin !== undefined && String(selection.bin || "").trim()) {
      params.set("binLocationScope", "current");
    }
    setShowMap(false);
    router.push(
      `/NewSearch/inventory/inventoryManage${
        params.toString() ? `?${params.toString()}` : ""
      }`
    );
  };

  if (isLoading) {
    return (
      <LoggedIn>
        <div className={styles.loadingPage}>
          <img src="/magmo-logo.png" alt="Loading Magmo" />
          <span>Loading {unitId || "storage unit"}...</span>
        </div>
      </LoggedIn>
    );
  }

  return (
    <LoggedIn>
      <div className={styles.page}>
        <Container fluid="xl" className={styles.container}>
          <header className={styles.header}>
            <div className={styles.identity}>
              <div className={styles.typeRow}>
                <Badge bg={unitType === "bin" ? "info" : "primary"}>
                  {unitType === "bin" ? "BIN" : "PALLET"}
                </Badge>
                <span>{unitId}</span>
              </div>
              <div className={styles.bigNumber}>{unitNumber || "-"}</div>
              <p>
                {unitType === "bin"
                  ? "Physical bin record and its current inventory."
                  : "Physical pallet record, bins, and current inventory."}
              </p>
            </div>
            <div className={styles.headerActions}>
              <Button
                variant="outline-primary"
                onClick={previewLabel}
                disabled={!unit || labelPreviewLoading}
              >
                {labelPreviewLoading ? "Preparing..." : "Preview Label"}
              </Button>
              <Button
                variant="primary"
                onClick={printLabel}
                disabled={!unit || isPrinting}
              >
                {isPrinting ? "Printing..." : "Print Label"}
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() =>
                  router.push("/NewSearch/inventory/inventoryManage")
                }
              >
                Back to Inventory
              </Button>
            </div>
          </header>

          {loadError && <Alert variant="danger">{loadError}</Alert>}
          {storedTypeMismatch && (
            <Alert variant="danger">
              This document says it is a {storedType}, but its canonical ID is a {unitType}.
              The ID was used for this view and the mismatch needs review.
            </Alert>
          )}
          {printError && <Alert variant="danger">{printError}</Alert>}
          {printSuccess && <Alert variant="success">{printSuccess}</Alert>}

          {unit && (
            <>
              <div className={styles.summaryGrid}>
                <Card className={styles.summaryCard}>
                  <Card.Body>
                    <div className={styles.cardLabel}>Warehouse location</div>
                    {locationSummary.status === "review_required" ? (
                      <>
                        <div className={styles.reviewValue}>Review required</div>
                        <p className={styles.cardHint}>
                          Current records disagree. No location was selected automatically.
                        </p>
                      </>
                    ) : locationSummary.location ? (
                      <>
                        <div className={styles.cardValue}>
                          {locationSummary.location.label}
                        </div>
                        <p className={styles.cardHint}>
                          {locationSummary.status === "observed"
                            ? "Derived from current item placement."
                            : "Confirmed storage-unit location."}
                        </p>
                        <Button
                          size="sm"
                          variant="outline-primary"
                          onClick={() => openMapAtLocation(locationSummary.location)}
                        >
                          View on Map
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className={styles.cardValue}>Not recorded</div>
                        <p className={styles.cardHint}>
                          No complete region and section are available.
                        </p>
                      </>
                    )}
                  </Card.Body>
                </Card>

                <Card className={styles.summaryCard}>
                  <Card.Body>
                    <div className={styles.cardLabel}>
                      {unitType === "bin" ? "Parent pallet" : "Contents"}
                    </div>
                    {unitType === "bin" ? (
                      parentSummary.status === "review_required" ? (
                        <>
                          <div className={styles.reviewValue}>Review required</div>
                          <p className={styles.cardHint}>
                            Items currently reference more than one pallet.
                          </p>
                        </>
                      ) : parentSummary.parentPalletId ? (
                        <>
                          <Link
                            href={`/NewSearch/inventory/storage/${parentSummary.parentPalletId}`}
                            className={styles.cardValueLink}
                          >
                            {parentSummary.parentPalletId}
                          </Link>
                          <p className={styles.cardHint}>Open the parent pallet record.</p>
                        </>
                      ) : (
                        <>
                          <div className={styles.cardValue}>No parent pallet</div>
                          <p className={styles.cardHint}>
                            This bin can hold items without being on a pallet.
                          </p>
                        </>
                      )
                    ) : (
                      <>
                        <div className={styles.metricRow}>
                          <span>
                            <strong>{palletBinGroups.length}</strong> bins
                          </span>
                          <span>
                            <strong>{palletContents.directItems.length}</strong> direct items
                          </span>
                          <span>
                            <strong>{palletContents.allItems.length}</strong> total items
                          </span>
                        </div>
                        <p className={styles.cardHint}>
                          Counts use current item placement only.
                        </p>
                      </>
                    )}
                  </Card.Body>
                </Card>
              </div>

              {locationSummary.status === "review_required" && (
                <section className={styles.reviewCard}>
                  <div>
                    <h2>Warehouse location candidates</h2>
                    <p>
                      These locations came from the storage record and current contents.
                      Select one only to inspect it on the map; this does not save a change.
                    </p>
                  </div>
                  <div className={styles.candidateList}>
                    {locationSummary.candidates.map((candidate) => (
                      <Button
                        key={candidate.key}
                        variant="outline-warning"
                        onClick={() => openMapAtLocation(candidate)}
                      >
                        {candidate.label}
                      </Button>
                    ))}
                    {!locationSummary.candidates.length && (
                      <span>No complete location candidates were recorded.</span>
                    )}
                  </div>
                </section>
              )}

              {unitType === "bin" &&
                parentSummary.status === "review_required" && (
                  <section className={styles.reviewCard}>
                    <div>
                      <h2>Parent pallet candidates</h2>
                      <p>
                        This bin is referenced under multiple pallets. The existing item
                        records were preserved for review.
                      </p>
                    </div>
                    <div className={styles.candidateList}>
                      {parentSummary.candidates.map((palletId) => (
                        <Link
                          key={palletId}
                          href={`/NewSearch/inventory/storage/${palletId}`}
                          className={styles.candidateLink}
                        >
                          {palletId}
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

              <section className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <div>
                    <h2>Pictures</h2>
                    <p>
                      Pictures belong to {unitId}, separate from inventory-item pictures.
                    </p>
                  </div>
                  <div className={styles.photoActions}>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => cameraInputRef.current?.click()}
                      disabled={isUploading}
                    >
                      Take Picture
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                    >
                      {isUploading ? "Uploading..." : "Browse"}
                    </Button>
                    <input
                      ref={cameraInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className={styles.hiddenInput}
                      onChange={uploadSelectedPhotos}
                    />
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className={styles.hiddenInput}
                      onChange={uploadSelectedPhotos}
                    />
                  </div>
                </div>
                {photoError && <Alert variant="danger">{photoError}</Alert>}
                <div className={styles.photoGrid}>
                  {photos.map((photo, index) => (
                    <div key={photo.storageName} className={styles.photoTile}>
                      <button
                        type="button"
                        className={styles.photoButton}
                        onClick={() => setActivePhoto({ ...photo, index })}
                        aria-label={`Open ${unitId} picture ${index + 1}`}
                      >
                        <img src={photo.url} alt="" loading="lazy" />
                      </button>
                      <Button
                        variant="danger"
                        size="sm"
                        className={styles.deletePhoto}
                        onClick={() => deletePhoto(photo)}
                        disabled={Boolean(deletingPhoto)}
                        aria-label={`Delete ${unitId} picture ${index + 1}`}
                      >
                        {deletingPhoto === photo.storageName ? "…" : "×"}
                      </Button>
                    </div>
                  ))}
                  {!photos.length && !isUploading && (
                    <div className={styles.emptyPictures}>No pictures added yet.</div>
                  )}
                  {isUploading && (
                    <div className={styles.uploadingTile}>
                      <Spinner animation="border" size="sm" />
                      <span>Uploading pictures...</span>
                    </div>
                  )}
                </div>
              </section>

              {unitType === "pallet" && (
                <section className={styles.sectionCard}>
                  <div className={styles.sectionHeader}>
                    <div>
                      <h2>Bins on this pallet</h2>
                      <p>
                        Grouped from current item placement; empty linked bins remain visible
                        when supplied by the storage-unit record.
                      </p>
                    </div>
                  </div>
                  <div className={styles.binGrid}>
                    {palletBinGroups.map((bin) => (
                      <Link
                        key={bin.id}
                        href={`/NewSearch/inventory/storage/${bin.id}`}
                        className={styles.binCard}
                      >
                        <strong>{bin.id}</strong>
                        <span>
                          {bin.items.length} item{bin.items.length === 1 ? "" : "s"}
                        </span>
                      </Link>
                    ))}
                    {!palletBinGroups.length && (
                      <div className={styles.emptyState}>No current bins found.</div>
                    )}
                  </div>
                </section>
              )}

              {unitType === "pallet" && (
                <ItemsTable
                  title="Direct items on pallet"
                  items={palletContents.directItems}
                  emptyMessage="No items are directly assigned to this pallet."
                />
              )}

              <ItemsTable
                title={unitType === "bin" ? "Items in this bin" : "All pallet items"}
                items={unitType === "bin" ? items : palletContents.allItems}
                emptyMessage={
                  unitType === "bin"
                    ? "No current items are assigned to this bin."
                    : "No current items are assigned to this pallet."
                }
              />
            </>
          )}
        </Container>
      </div>

      <Modal
        show={Boolean(activePhoto)}
        onHide={() => setActivePhoto(null)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {unitId} picture {activePhoto ? activePhoto.index + 1 : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.photoViewerBody}>
          {activePhoto?.url && (
            <img src={activePhoto.url} alt={`${unitId} picture`} />
          )}
        </Modal.Body>
      </Modal>

      <Modal
        show={showLabelPreview}
        onHide={() => setShowLabelPreview(false)}
        centered
        size="lg"
        className={styles.labelPreviewModal}
        dialogClassName={styles.labelPreviewDialog}
      >
        <Modal.Header closeButton className={styles.labelPreviewHeader}>
          <Modal.Title>{unitId} label preview</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.labelPreviewBody}>
          {labelPreviewError && (
            <Alert variant="danger">{labelPreviewError}</Alert>
          )}
          {labelPreviewLoading && (
            <div className={styles.labelPreviewLoading}>
              <Spinner animation="border" size="sm" /> Generating QR and barcode...
            </div>
          )}
          {labelPreview && (
            <div className={styles.storageLabelSheet}>
              <div className={styles.storageLabelType}>
                {unitType === "bin" ? "BIN" : "PALLET"}
              </div>
              <div className={styles.storageLabelNumber}>{unitNumber}</div>
              <div className={styles.storageLabelSymbols}>
                <div
                  className={styles.storageLabelQr}
                  aria-label={`QR code containing ${unitId}`}
                  dangerouslySetInnerHTML={{ __html: labelPreview.qrSvg }}
                />
                <div className={styles.storageLabelBarcodeBlock}>
                  <div
                    className={styles.storageLabelBarcode}
                    aria-label={`Code 128 barcode containing ${unitId}`}
                    dangerouslySetInnerHTML={{ __html: labelPreview.barcodeSvg }}
                  />
                  <strong>{unitId}</strong>
                </div>
              </div>
            </div>
          )}
          <p className={styles.labelPreviewHint}>
            Preview size is 4 × 2 inches. Both symbols encode exactly {unitId}.
          </p>
        </Modal.Body>
        <Modal.Footer className={styles.labelPreviewFooter}>
          <Button
            variant="secondary"
            onClick={() => setShowLabelPreview(false)}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => window.print()}
            disabled={!labelPreview}
          >
            Print from Browser
          </Button>
        </Modal.Footer>
      </Modal>

      <WarehouseMapModal
        show={showMap}
        onHide={() => setShowMap(false)}
        onView={viewInventorySelection}
        initialSelection={mapSelection || {}}
      />
    </LoggedIn>
  );
}
