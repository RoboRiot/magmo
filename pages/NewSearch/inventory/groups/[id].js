import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Button,
  Container,
  Modal,
  Spinner,
  Table,
} from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import LoggedIn from "../../../LoggedIn";
import firebase from "../../../../context/Firebase";
import styles from "../../../../styles/InventoryManage.module.css";

const GROUP_TYPES = {
  shipping: "Shipping",
  receiving: "Receiving",
};

function getTimestampMillis(value) {
  if (!value) return 0;
  if (typeof value.toMillis === "function") return value.toMillis();
  if (value.seconds) return value.seconds * 1000;
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function formatDate(value) {
  const millis = getTimestampMillis(value);
  if (!millis) return "-";
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(millis));
}

function normalizeLocation(loc = {}) {
  if (!loc || typeof loc !== "object") return "";
  let section = "";
  if (typeof loc.section === "string") {
    section = loc.section;
  } else if (loc.section && typeof loc.section === "object") {
    section = [loc.section.letter, loc.section.number].filter(Boolean).join("");
  }
  return [
    loc.region ? `Region ${loc.region}` : "",
    section ? `Section ${section}` : "",
    loc.pallet ? `Pallet ${loc.pallet}` : "",
    loc.bin ? `Bin ${loc.bin}` : "",
  ]
    .filter(Boolean)
    .join(" / ");
}

function valueText(value) {
  if (Array.isArray(value)) return value.filter(Boolean).join(", ");
  return String(value || "").trim();
}

function getLatestEntry(entries = [], key) {
  if (!Array.isArray(entries) || !entries.length) return "";
  const sorted = [...entries].sort((a, b) => {
    const aTime = Date.parse(a?.date || "") || 0;
    const bTime = Date.parse(b?.date || "") || 0;
    return bTime - aTime;
  });
  return valueText(sorted[0]?.[key]);
}

function normalizeItem(document) {
  const doc = document.data() || {};
  const location =
    doc.localLocCurrent ||
    normalizeLocation(doc.newLocalCurrent) ||
    normalizeLocation({
      region: doc.region,
      section: doc.section,
      bin: doc.bin,
      pallet: doc.pallet,
    });
  const dimensions = [doc.length, doc.width, doc.height]
    .map(valueText)
    .filter(Boolean)
    .join(" x ");

  return {
    id: document.id,
    name: doc.name || "",
    pn: valueText(doc.pn),
    sn: valueText(doc.sn),
    localSN: doc.localSN || doc.local_sn || "",
    status: doc.status || "",
    price: doc.price || "",
    poNumber: doc.poNumber || "",
    trackingNumber: doc.trackingNumber || "",
    dimensions,
    location,
    arrivalDate: doc.arrival_date || "",
    departureDate: doc.departure_date || "",
    workOrder: getLatestEntry(doc.workOrders, "workOrder"),
    description: getLatestEntry(doc.descriptions, "description"),
  };
}

export default function InventoryGroupPage() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [group, setGroup] = useState(null);
  const [items, setItems] = useState([]);
  const [showPrintModal, setShowPrintModal] = useState(false);

  useEffect(() => {
    if (!router.isReady || !id) return undefined;
    let cancelled = false;
    const db = firebase.firestore();

    const loadGroup = async () => {
      setLoading(true);
      setError("");
      try {
        const groupDoc = await db.collection("shipping_groups").doc(id).get();
        if (!groupDoc.exists) {
          throw new Error("Group not found.");
        }
        const groupData = groupDoc.data() || {};
        const itemIds = Array.isArray(groupData.itemIds)
          ? groupData.itemIds.filter(Boolean)
          : [];
        const itemDocs = await Promise.all(
          itemIds.map((itemId) => db.collection("Test").doc(itemId).get())
        );
        const itemMap = new Map(
          itemDocs
            .filter((document) => document.exists)
            .map((document) => [document.id, normalizeItem(document)])
        );

        if (cancelled) return;
        setGroup({
          id: groupDoc.id,
          name:
            groupData.name ||
            `${GROUP_TYPES[groupData.type] || "Inventory"} Group`,
          type: groupData.type === "receiving" ? "receiving" : "shipping",
          itemIds,
          createdAt: groupData.createdAt || null,
          updatedAt: groupData.updatedAt || null,
        });
        setItems(itemIds.map((itemId) => itemMap.get(itemId)).filter(Boolean));
      } catch (loadError) {
        console.error("Failed to load inventory group", loadError);
        if (!cancelled) {
          setError(loadError.message || "Could not load this group.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadGroup();
    return () => {
      cancelled = true;
    };
  }, [id, router.isReady]);

  const groupTypeLabel = GROUP_TYPES[group?.type] || "Inventory";
  const printableTitle = `${groupTypeLabel} Item Sheet`;
  const missingCount = useMemo(
    () => Math.max(0, (group?.itemIds?.length || 0) - items.length),
    [group, items]
  );

  const printSheet = (
    <div className={styles.printSheet}>
      <div className={styles.printHeader}>
        <div>
          <p>{printableTitle}</p>
          <h1>{group?.name || "Inventory Group"}</h1>
        </div>
        <div>
          <strong>Group ID</strong>
          <span>{group?.id || "-"}</span>
        </div>
      </div>
      <div className={styles.printMetaGrid}>
        <div>
          <strong>Type</strong>
          <span>{groupTypeLabel}</span>
        </div>
        <div>
          <strong>Items</strong>
          <span>{items.length}</span>
        </div>
        <div>
          <strong>Created</strong>
          <span>{formatDate(group?.createdAt)}</span>
        </div>
        <div>
          <strong>Updated</strong>
          <span>{formatDate(group?.updatedAt || group?.createdAt)}</span>
        </div>
      </div>
      <Table bordered className={styles.printTable}>
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Local SN</th>
            <th>PN</th>
            <th>SN</th>
            <th>Location</th>
            <th>PO / Tracking</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>
                <strong>{item.name || "-"}</strong>
                <small>{item.id}</small>
              </td>
              <td>{item.localSN || "-"}</td>
              <td>{item.pn || "-"}</td>
              <td>{item.sn || "-"}</td>
              <td>{item.location || "-"}</td>
              <td>
                {[item.poNumber && `PO ${item.poNumber}`, item.trackingNumber]
                  .filter(Boolean)
                  .join(" / ") || "-"}
              </td>
              <td>
                {[
                  item.status && `Status: ${item.status}`,
                  item.dimensions && `Dims: ${item.dimensions}`,
                  item.workOrder && `WO: ${item.workOrder}`,
                ]
                  .filter(Boolean)
                  .join(" / ") || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className={styles.printFooter}>
        <span>Prepared by Magmo inventory</span>
        <span>Printed {new Date().toLocaleString()}</span>
      </div>
    </div>
  );

  if (loading) {
    return (
      <LoggedIn>
        <div className={styles.loadingPage}>
          <Spinner animation="border" />
          <div>Loading group...</div>
        </div>
      </LoggedIn>
    );
  }

  return (
    <LoggedIn>
      <div className={styles.page}>
        <Container fluid="xl" className={styles.container}>
          <header className={styles.header}>
            <div>
              <div className={styles.eyebrow}>{groupTypeLabel} group</div>
              <h1 className={styles.title}>{group?.name || "Group"}</h1>
              <p className={styles.subtitle}>
                Group ID {group?.id}. {items.length} item
                {items.length === 1 ? "" : "s"} loaded.
              </p>
            </div>
            <div className={styles.headerActions}>
              <Button
                variant="outline-secondary"
                onClick={() => router.push("/NewSearch/inventory/inventoryManage")}
              >
                Back to Inventory
              </Button>
              <Button onClick={() => setShowPrintModal(true)}>
                Print Sheet
              </Button>
            </div>
          </header>

          {error && <Alert variant="danger">{error}</Alert>}
          {missingCount > 0 && (
            <Alert variant="warning">
              {missingCount} item{missingCount === 1 ? "" : "s"} in this group
              could not be found.
            </Alert>
          )}

          <section className={styles.inventoryCard}>
            <div className={styles.inventoryToolbar}>
              <div>
                <h2>Group Items</h2>
                <p>Click an item to open its item page.</p>
              </div>
            </div>
            <div className={styles.tableWrap}>
              <Table bordered hover responsive className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Local SN</th>
                    <th>PN</th>
                    <th>SN</th>
                    <th>Status</th>
                    <th>Location</th>
                    <th>PO Number</th>
                    <th>Tracking</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr
                      key={item.id}
                      className={styles.clickableRow}
                      onClick={() => router.push(`/NewSearch/item/${item.id}`)}
                    >
                      <td className={styles.nameCell}>
                        <Link
                          href={`/NewSearch/item/${item.id}`}
                          onClick={(event) => event.stopPropagation()}>

                          {item.name || item.id}

                        </Link>
                      </td>
                      <td>{item.localSN || "-"}</td>
                      <td>{item.pn || "-"}</td>
                      <td>{item.sn || "-"}</td>
                      <td>{item.status || "-"}</td>
                      <td>{item.location || "-"}</td>
                      <td>{item.poNumber || "-"}</td>
                      <td>{item.trackingNumber || "-"}</td>
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr>
                      <td colSpan={8} className={styles.emptyState}>
                        This group does not have any available items.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </section>
        </Container>

        <Modal
          show={showPrintModal}
          onHide={() => setShowPrintModal(false)}
          size="xl"
          centered
          backdropClassName={styles.printHidden}
        >
          <Modal.Header closeButton className={styles.printHidden}>
            <Modal.Title>{printableTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{printSheet}</Modal.Body>
          <Modal.Footer className={styles.printHidden}>
            <Button
              variant="secondary"
              onClick={() => setShowPrintModal(false)}
            >
              Close
            </Button>
            <Button onClick={() => window.print()}>Print</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </LoggedIn>
  );
}
