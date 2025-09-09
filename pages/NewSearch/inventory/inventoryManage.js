import React, { useEffect, useState, useMemo } from "react";
import LoggedIn from "../../LoggedIn";
import firebase from "../../../context/Firebase";
import {
  Table,
  Form,
  Button,
  Container,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";


export default function InventoryManage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [filters, setFilters] = useState({
    region: "",
    section: "",
    bin: "",
    pallet: "",
    localSN: "",
  });
  const [bulkField, setBulkField] = useState("");
  const [bulkValue, setBulkValue] = useState("");

  // ---- load data once ----
  useEffect(() => {
    const db = firebase.firestore();
    db.collection("Test")
      .get()
      .then((snap) => {
        const data = snap.docs.map((d) => {
          const doc = d.data();
          const loc = doc.newLocalCurrent || {};
          return {
            id: d.id,
            name: doc.name || "",
            pn: doc.pn || "",
            sn: doc.sn || "",
            localSN: doc.localSN || "",
            region: loc.region?.toString() ?? "",
            section: loc.section?.toString() ?? "",
            bin: loc.bin?.toString() ?? "",
            pallet: loc.pallet?.toString() ?? "",
          };
        });
        setItems(data);
      })
      .finally(() => setLoading(false));
  }, []);

  // ---- derive distinct filter options ----
  const distinct = (arr) =>
    Array.from(new Set(arr.filter((v) => v))).sort();
  const regions  = useMemo(() => distinct(items.map((i) => i.region)),  [items]);
  const sections = useMemo(() => distinct(items.map((i) => i.section)), [items]);
  const bins     = useMemo(() => distinct(items.map((i) => i.bin)),     [items]);
  const pallets  = useMemo(() => distinct(items.map((i) => i.pallet)),  [items]);

  // ---- toggles ----
  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  const toggleSelectAll = () => {
    const visibleIds = filteredItems.map((i) => i.id);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (visibleIds.every((id) => next.has(id))) {
        visibleIds.forEach((id) => next.delete(id));
      } else {
        visibleIds.forEach((id) => next.add(id));
      }
      return next;
    });
  };

  // ---- filtered list ----
  const filteredItems = items.filter((it) =>
    ["region", "section", "bin", "pallet", "localSN"].every(
      (f) => !filters[f] || it[f] === filters[f]
    )
  );

  // ---- bulk update handler ----
  const applyBulkUpdate = () => {
    if (!bulkField || !bulkValue) return;
    const db = firebase.firestore();

    const updates = Array.from(selectedIds).map((id) => {
      const orig = items.find((i) => i.id === id) || {};
      const newRegion  = bulkField === "region"  ? bulkValue : orig.region;
      const newSection = bulkField === "section" ? bulkValue : orig.section;
      const newBin     = bulkField === "bin"     ? bulkValue : orig.bin;
      const newPallet  = bulkField === "pallet"  ? bulkValue : orig.pallet;

      const parts = [];
      if (newRegion)  parts.push(newRegion);
      if (newSection) parts.push(newSection);
      if (newBin)     parts.push(`B${newBin}`);
      if (newPallet)  parts.push(`P${newPallet}`);
      const newLocString = parts.join("-");

      const updateObj = {
        region: newRegion,
        section: newSection,
        bin: newBin,
        pallet: newPallet,
        localLocCurrent: newLocString,
        newLocalCurrent: {
          region: newRegion,
          section: newSection,
          bin: newBin,
          pallet: newPallet,
        },
      };

      return db
        .collection("Test")
        .doc(id)
        .update(updateObj)
        .then(() => {
          setItems((prev) =>
            prev.map((item) =>
              item.id === id
                ? {
                    ...item,
                    region: newRegion,
                    section: newSection,
                    bin: newBin,
                    pallet: newPallet,
                  }
                : item
            )
          );
        });
    });

    Promise.all(updates).then(() => {
      setSelectedIds(new Set());
      setBulkField("");
      setBulkValue("");
    });
  };

  // ---- loading state ----
  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
            </Container>
        );
    }

    function LoadingButton({ type, name, route }) {
      const [isLoading, setLoading] = useState(false);
    
      useEffect(() => {
        if (isLoading) {
          simulateNetworkRequest().then(() => setLoading(false));
        }
      }, [isLoading]);
    
      const handleClick = () => setLoading(true);
    
      return (
        <Link href={`/${route}`}>
                <a
                    className={`btn btn-${type}`}
                    disabled={isLoading}
                    onClick={!isLoading ? handleClick : null}
                >
                    {isLoading ? "Loading…" : name}
                </a>
            </Link>
        );
    }

    function simulateNetworkRequest() {
        return new Promise(resolve => setTimeout(resolve, 2000));
    }

    return (
        <LoggedIn>
            <Container className="py-4">
                <h2>Inventory Management</h2>
                <LoadingButton
                    type="primary"
                    name="Back"
                    route="Warehousedb/WarehouseSelect"
                />
                {/* dropdown filters */}
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Region</Form.Label>
                        <Form.Select
                            value={filters.region}
                            onChange={(e) => {
                const v = e.target.value;
                setFilters((p) => ({ ...p, region: v }));
              }}
            >
              <option value="">All regions</option>
              {regions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Form.Label>Section</Form.Label>
            <Form.Select
              value={filters.section}
              onChange={(e) => {
                const v = e.target.value;
                setFilters((p) => ({ ...p, section: v }));
              }}
            >
              <option value="">All sections</option>
              {sections.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Form.Label>Bin</Form.Label>
            <Form.Select
              value={filters.bin}
              onChange={(e) => {
                const v = e.target.value;
                setFilters((p) => ({ ...p, bin: v }));
              }}
            >
              <option value="">All bins</option>
              {bins.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Form.Label>Pallet</Form.Label>
            <Form.Select
              value={filters.pallet}
              onChange={(e) => {
                const v = e.target.value;
                setFilters((p) => ({ ...p, pallet: v }));
              }}
            >
              <option value="">All pallets</option>
              {pallets.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Form.Label>Local SN</Form.Label>
            <Form.Control
              placeholder="Search SN"
              value={filters.localSN}
              onChange={(e) => {
                const v = e.target.value;
                setFilters((p) => ({ ...p, localSN: v }));
              }}
            />
          </Col>
        </Row>

        {/* bulk action bar */}
        <div className="d-flex mb-2 align-items-center">
          <Form.Check
            type="checkbox"
            label="Select All"
            onChange={toggleSelectAll}
            checked={
              filteredItems.length > 0 &&
              filteredItems.every((i) => selectedIds.has(i.id))
            }
          />
          {selectedIds.size > 0 && (
            <>
              <Form.Select
                className="mx-2"
                value={bulkField}
                onChange={(e) => setBulkField(e.target.value)}
                style={{ width: "150px" }}
              >
                <option value="">Change…</option>
                <option value="region">Region</option>
                <option value="section">Section</option>
                <option value="bin">Bin</option>
                <option value="pallet">Pallet</option>
              </Form.Select>
              <Form.Control
                style={{ width: "100px" }}
                placeholder="New value"
                value={bulkValue}
                onChange={(e) => setBulkValue(e.target.value)}
              />
              <Button className="ms-2" onClick={applyBulkUpdate}>
                Apply
              </Button>
            </>
          )}
        </div>

        {/* data table */}
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>PN</th>
              <th>SN</th>
              <th>LocalSN</th>
              <th>Region</th>
              <th>Section</th>
              <th>Bin</th>
              <th>Pallet</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((it) => (
              <tr key={it.id}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selectedIds.has(it.id)}
                    onChange={() => toggleSelect(it.id)}
                  />
                </td>
                <td>{it.name}</td>
                <td>{it.pn}</td>
                <td>{it.sn}</td>
                <td>{it.localSN}</td>
                <td>{it.region}</td>
                <td>{it.section}</td>
                <td>{it.bin}</td>
                <td>{it.pallet}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </LoggedIn>
  );
}
