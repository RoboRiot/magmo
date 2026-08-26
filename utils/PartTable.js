import React, { useState, useEffect, useRef } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { formatDate } from "./fetchAssociations";
import {
  formatLoc,
  getItemCreatedDate,
  getMostRecentDatedEntry,
} from "./itemFormShared";
import firebase from "../context/Firebase";
import styles from "../styles/PartTable.module.css";

const photoCache = new Map();

function formatPreviewValue(value) {
  if (Array.isArray(value)) {
    const values = value
      .map((entry) => String(entry ?? "").trim())
      .filter(Boolean);
    return values.length ? values.join(", ") : "—";
  }
  const normalized = String(value ?? "").trim();
  return normalized || "—";
}

function getReferenceLabel(reference) {
  if (!reference) return "";
  if (typeof reference === "string") {
    const parts = reference.split("/").filter(Boolean);
    return parts[parts.length - 1] || reference;
  }
  return String(reference.name || reference.id || reference.path || "")
    .split("/")
    .filter(Boolean)
    .pop() || "";
}

function getMachinePreviewLabel(machine, fallbackId) {
  const values = [
    machine?.name,
    machine?.OEM || machine?.oem,
    machine?.Modality || machine?.modality,
    machine?.Model || machine?.model,
  ]
    .map((value) => formatPreviewValue(value))
    .filter((value) => value !== "—");
  return Array.from(new Set(values)).join(" - ") || fallbackId || "";
}

function getPreviewDescription(item) {
  const latestDescription = getMostRecentDatedEntry(item?.descriptions, {});
  return formatPreviewValue(
    latestDescription?.description ||
      item?.description ||
      item?.Description ||
      item?.desc
  );
}

function getPreviewLocation(item, side) {
  const isFrom = side === "from";
  const machineData = isFrom ? item?.machineData : item?.currentMachineData;
  const machineId =
    (isFrom ? item?.machineFromId : item?.currentMachineId) ||
    getReferenceLabel(
      isFrom
        ? item?.MachineFrom || item?.Machine
        : item?.MachineCurrent || item?.CurrentMachine
    );
  const clientId =
    (isFrom ? item?.clientFromId : item?.clientCurrentId) ||
    getReferenceLabel(isFrom ? item?.ClientFrom : item?.ClientCurrent) ||
    getReferenceLabel(machineData?.client);
  const clientName =
    (isFrom ? item?.clientFromName : item?.clientCurrentName) ||
    machineData?.Client ||
    clientId;
  const machineName = getMachinePreviewLabel(machineData, machineId);
  const localLocation =
    (isFrom ? item?.localLocFrom : item?.localLocCurrent) ||
    formatLoc(isFrom ? item?.newLocalFrom : item?.newLocalCurrent);

  const parts = Array.from(
    new Set([clientName, machineName, localLocation].filter(Boolean))
  );
  return parts.length ? parts.join(" • ") : "—";
}

export default function PartTable({
  info,
  labels,
  ids,
  hoverStyle,
  sortCheckAll,
  checkDelete,
  isDeleting,
  rowSelect,
  setHoverIndex,
  hoverIndex,
  selectedItems,
  setSelectedItems,
  minRows = 10,
  canDelete = false,
  showPictures = false,
}) {
  // const [selectedItems, setSelectedItems] = useState([]);
  const [longPressName, setLongPressName] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [itemPhotos, setItemPhotos] = useState({});
  const [photoViewerItem, setPhotoViewerItem] = useState(null);
  const [previewItem, setPreviewItem] = useState(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const pressTimerRef = useRef(null);
  const longPressTriggeredRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const media = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(media.matches);
    update();
    if (media.addEventListener) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }
    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  useEffect(() => {
    if (!showPictures) return undefined;

    let cancelled = false;
    const itemsToLoad = (info || []).filter(
      (item) => item?.id && !photoCache.has(item.id)
    );

    (info || []).forEach((item) => {
      if (item?.id && photoCache.has(item.id)) {
        setItemPhotos((current) => ({
          ...current,
          [item.id]: photoCache.get(item.id),
        }));
      }
    });

    const loadPhotos = async () => {
      const queue = [...itemsToLoad];
      const workerCount = Math.min(6, queue.length);

      const worker = async () => {
        while (queue.length && !cancelled) {
          const item = queue.shift();
          try {
            const result = await firebase
              .storage()
              .ref()
              .child(`Parts/${item.id}`)
              .listAll();
            const sortedItems = [...result.items].sort((a, b) =>
              a.name.localeCompare(b.name)
            );
            const photos = await Promise.all(
              sortedItems.map((photoRef) => photoRef.getDownloadURL())
            );
            photoCache.set(item.id, photos);
            if (!cancelled) {
              setItemPhotos((current) => ({
                ...current,
                [item.id]: photos,
              }));
            }
          } catch (error) {
            console.warn(`Failed to load photos for item ${item.id}`, error);
            photoCache.set(item.id, []);
            if (!cancelled) {
              setItemPhotos((current) => ({
                ...current,
                [item.id]: [],
              }));
            }
          }
        }
      };

      await Promise.all(
        Array.from({ length: workerCount }, () => worker())
      );
    };

    loadPhotos();
    return () => {
      cancelled = true;
    };
  }, [info, showPictures]);

  const openPhotoViewer = (event, item, index) => {
    event.stopPropagation();
    setPhotoViewerItem({
      ...item,
      photos: itemPhotos[item.id] || [],
    });
    setActivePhotoIndex(index);
  };

  const closePhotoViewer = () => {
    setPhotoViewerItem(null);
    setActivePhotoIndex(0);
  };

  const showPreviousPhoto = () => {
    const photoCount = photoViewerItem?.photos?.length || 0;
    if (!photoCount) return;
    setActivePhotoIndex((current) =>
      current === 0 ? photoCount - 1 : current - 1
    );
  };

  const showNextPhoto = () => {
    const photoCount = photoViewerItem?.photos?.length || 0;
    if (!photoCount) return;
    setActivePhotoIndex((current) =>
      current === photoCount - 1 ? 0 : current + 1
    );
  };

  useEffect(() => {
    if (!photoViewerItem) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") showPreviousPhoto();
      if (event.key === "ArrowRight") showNextPhoto();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [photoViewerItem]);

  // Toggle selection of items
  const handleSelectItem = (id) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter((itemId) => itemId !== id)
        : [...prevSelectedItems, id]
    );
  };

  const startLongPress = (name) => () => {
    if (!isMobile) return;
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
    }
    pressTimerRef.current = setTimeout(() => {
      longPressTriggeredRef.current = true;
      setLongPressName(name);
    }, 450);
  };

  const cancelLongPress = () => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
  };

  const dismissLongPress = () => {
    longPressTriggeredRef.current = false;
    setLongPressName(null);
  };

  const hasRows = info.length > 0;
  const paddingCount = hasRows ? Math.max(0, minRows - info.length) : 0;
  const columnCount =
    labels.length + (showPictures ? 1 : 0) + (canDelete ? 1 : 0);
  const columnClasses = [
    styles.nameCol,
    styles.dateCol,
    styles.workOrderCol,
    styles.partNumberCol,
    styles.serialNumberCol,
  ];

  return (
    <>
      <div className={styles.scrollableTable}>
        <Table
          striped
          bordered
          hover
          size="sm"
          className={`mb-0 ${styles.fixedTable} ${
            showPictures ? styles.picturesTable : ""
          }`}
        >
          <thead className={styles.stickyHeader}>
            <tr>
              {showPictures && (
                <th className={styles.pictureCol} style={{ textAlign: "center" }}>
                  Pictures
                </th>
              )}
              {labels.map((item, index) => (
                <th
                  className={columnClasses[index]}
                  style={hoverStyle(index)}
                  onMouseOver={() => setHoverIndex(index)}
                  onMouseOut={() => setHoverIndex(null)}
                  onClick={() => sortCheckAll(index)}
                  key={index}
                >
                  {item}
                </th>
              ))}
              {canDelete && (
                <th className={styles.actionCol} style={{ textAlign: "center" }}>
                  delete
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {!hasRows && (
              <tr>
                <td colSpan={columnCount} className={styles.noResultsCell}>
                  No items found.
                </td>
              </tr>
            )}
            {info.map((item, index) => (
              <tr
                key={index}
                onClick={(e) => {
                  if (longPressTriggeredRef.current) {
                    longPressTriggeredRef.current = false;
                    return;
                  }
                  // Only trigger rowSelect if the target is not a checkbox
                  if (e.target.type !== "checkbox") {
                    setPreviewItem(item);
                  }
                }}
                onTouchStart={startLongPress(item.name)}
                onTouchEnd={cancelLongPress}
                onTouchCancel={cancelLongPress}
                onTouchMove={cancelLongPress}
                className="clickable-row"
              >
                {showPictures && (
                  <td className={styles.pictureCell}>
                    {itemPhotos[item.id] === undefined ? (
                      <span className={styles.photoLoading}>Loading...</span>
                    ) : itemPhotos[item.id].length > 0 ? (
                      <div className={styles.thumbnailList}>
                        {itemPhotos[item.id].map((photo, photoIndex) => (
                          <button
                            key={photo}
                            type="button"
                            className={styles.thumbnailButton}
                            onClick={(event) =>
                              openPhotoViewer(event, item, photoIndex)
                            }
                            aria-label={`Open picture ${photoIndex + 1} of ${
                              itemPhotos[item.id].length
                            } for ${item.name}`}
                          >
                            <img
                              src={photo}
                              alt=""
                              className={styles.thumbnail}
                              loading="lazy"
                            />
                          </button>
                        ))}
                      </div>
                    ) : (
                      <span className={styles.noPictures}>-</span>
                    )}
                  </td>
                )}
                <td
                  className={styles.nameCol}
                  style={{ textAlign: "center", cursor: "default" }}
                >
                  <div className={styles.cellClamp} title={item.name}>
                    {item.name}
                  </div>
                </td>
                <td
                  className={styles.dateCol}
                  style={{ textAlign: "center", cursor: "default" }}
                >
                  <div
                    className={styles.cellClamp}
                    title={formatDate(getItemCreatedDate(item))}
                  >
                    {formatDate(getItemCreatedDate(item))}
                  </div>
                </td>
                <td
                  className={styles.workOrderCol}
                  style={{ textAlign: "center", cursor: "default" }}
                >
                  <div
                    className={styles.cellClamp}
                    title={
                      getMostRecentDatedEntry(item.workOrders, {})?.workOrder ||
                      "N/A"
                    }
                  >
                    {getMostRecentDatedEntry(item.workOrders, {})?.workOrder ||
                      "N/A"}
                  </div>
                </td>
                <td
                  className={styles.partNumberCol}
                  style={{ textAlign: "center", cursor: "default" }}
                >
                  <div className={styles.cellClamp} title={item.pn}>
                    {item.pn}
                  </div>
                </td>
                <td
                  className={styles.serialNumberCol}
                  style={{ textAlign: "center", cursor: "default" }}
                >
                  <div className={styles.cellClamp} title={item.sn}>
                    {item.sn}
                  </div>
                </td>
                {canDelete && (
                  <td className={styles.actionCol} style={{ textAlign: "center" }}>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      disabled={isDeleting}
                      onClick={(e) => {
                        checkDelete(e, index, [item.id], item.name);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                )}
              </tr>
            ))}
            {paddingCount > 0 &&
              Array.from({ length: paddingCount }).map((_, index) => (
                <tr key={`empty-${index}`}>
                  <td
                    colSpan={columnCount}
                    style={{ textAlign: "center" }}
                  >
                    &nbsp;
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      {isMobile && longPressName && (
        <div
          className={styles.longPressOverlay}
          onClick={dismissLongPress}
          role="button"
          tabIndex={0}
        >
          <div className={styles.longPressCard}>{longPressName}</div>
        </div>
      )}
      <Modal
        show={Boolean(previewItem)}
        onHide={() => setPreviewItem(null)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{previewItem?.name || "Inventory item"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.itemPreviewGrid}>
            <div><span>Item ID</span><strong>{previewItem?.id || "—"}</strong></div>
            <div><span>Part number</span><strong>{formatPreviewValue(previewItem?.pn)}</strong></div>
            <div><span>Serial number</span><strong>{formatPreviewValue(previewItem?.sn)}</strong></div>
            <div><span>Work order</span><strong>{getMostRecentDatedEntry(previewItem?.workOrders, {})?.workOrder || "—"}</strong></div>
            <div><span>Description</span><strong>{getPreviewDescription(previewItem)}</strong></div>
            <div><span>From location</span><strong>{getPreviewLocation(previewItem, "from")}</strong></div>
            <div><span>Current location</span><strong>{getPreviewLocation(previewItem, "current")}</strong></div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setPreviewItem(null)}>Close</Button>
          <Button
            variant="primary"
            onClick={() => {
              const item = previewItem;
              setPreviewItem(null);
              rowSelect(item);
            }}
          >
            Edit item
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={Boolean(photoViewerItem)}
        onHide={closePhotoViewer}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {photoViewerItem?.name || "Item picture"}
            {photoViewerItem?.photos?.length > 0 &&
              ` - Picture ${activePhotoIndex + 1} of ${
                photoViewerItem.photos.length
              }`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.photoViewerBody}>
          {photoViewerItem?.photos?.[activePhotoIndex] ? (
            <img
              src={photoViewerItem.photos[activePhotoIndex]}
              alt={`${photoViewerItem.name || "Item"} picture ${
                activePhotoIndex + 1
              }`}
              className={styles.fullPhoto}
            />
          ) : (
            <div className={styles.noPictures}>No picture selected.</div>
          )}
          {photoViewerItem?.photos?.length > 1 && (
            <div className={styles.viewerThumbnails}>
              {photoViewerItem.photos.map((photo, index) => (
                <button
                  key={photo}
                  type="button"
                  className={`${styles.viewerThumbnailButton} ${
                    index === activePhotoIndex
                      ? styles.viewerThumbnailSelected
                      : ""
                  }`}
                  onClick={() => setActivePhotoIndex(index)}
                  aria-label={`Show picture ${index + 1}`}
                >
                  <img
                    src={photo}
                    alt=""
                    className={styles.viewerThumbnail}
                  />
                </button>
              ))}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={showPreviousPhoto}
            disabled={(photoViewerItem?.photos?.length || 0) <= 1}
          >
            Previous
          </Button>
          <Button
            variant="outline-secondary"
            onClick={showNextPhoto}
            disabled={(photoViewerItem?.photos?.length || 0) <= 1}
          >
            Next
          </Button>
          <Button variant="secondary" onClick={closePhotoViewer}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
