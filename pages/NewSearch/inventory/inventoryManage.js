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
import { useRouter } from "next/router";
import { formatLoc } from "../../../utils/itemFormShared";


export default function InventoryManage() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [filters, setFilters] = useState({
    region: "",
    sectionLetter: "",
    sectionNumber: "",
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
          let sectionLetter = "";
          let sectionNumber = "";
          if (typeof loc.section === "string") {
            sectionLetter = loc.section.slice(0, 1);
            sectionNumber = loc.section.slice(1);
          } else if (loc.section) {
            sectionLetter = loc.section.letter || "";
            sectionNumber =
              loc.section.number !== undefined && loc.section.number !== null
                ? String(loc.section.number)
                : "";
          }
          return {
            id: d.id,
            name: doc.name || "",
            pn: doc.pn || "",
            sn: doc.sn || "",
            localSN: doc.localSN || "",
            region: loc.region?.toString() ?? "",
            sectionLetter,
            sectionNumber,
            bin: loc.bin?.toString() ?? "",
            pallet: loc.pallet?.toString() ?? "",
          };
        });
        setItems(data);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    const qp = router.query;
    const getParam = (key) =>
      Array.isArray(qp[key]) ? qp[key][0] : qp[key];
    setFilters((prev) => ({
      ...prev,
      region: getParam("region") || "",
      sectionLetter: getParam("sectionLetter") || "",
      sectionNumber: getParam("sectionNumber") || "",
      bin: getParam("bin") || "",
      pallet: getParam("pallet") || "",
      localSN: getParam("localSN") || "",
    }));
  }, [router.isReady]);

  // ---- derive distinct filter options ----
  const distinct = (arr) =>
    Array.from(new Set(arr.filter((v) => v))).sort();
  const regions  = useMemo(() => distinct(items.map((i) => i.region)),  [items]);
  const sectionLetters = useMemo(
    () => distinct(items.map((i) => i.sectionLetter)),
    [items]
  );
  const sectionNumbers = useMemo(
    () => distinct(items.map((i) => i.sectionNumber)),
    [items]
  );
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
    ["region", "sectionLetter", "sectionNumber", "bin", "pallet", "localSN"].every(
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
      const newSectionLetter =
        bulkField === "sectionLetter" ? bulkValue : orig.sectionLetter;
      const newSectionNumber =
        bulkField === "sectionNumber" ? bulkValue : orig.sectionNumber;
      const newBin     = bulkField === "bin"     ? bulkValue : orig.bin;
      const newPallet  = bulkField === "pallet"  ? bulkValue : orig.pallet;

      const newLocString = formatLoc({
        region: newRegion,
        section:
          newSectionLetter && newSectionNumber
            ? { letter: newSectionLetter, number: newSectionNumber }
            : undefined,
        bin: newBin,
        pallet: newPallet,
      });

      const updateObj = {
        region: newRegion,
        bin: newBin,
        pallet: newPallet,
        localLocCurrent: newLocString,
        newLocalCurrent: {
          region: newRegion,
          bin: newBin,
          pallet: newPallet,
        },
      };
      if (newSectionLetter && newSectionNumber) {
        updateObj.section = { letter: newSectionLetter, number: newSectionNumber };
        updateObj.newLocalCurrent.section = {
          letter: newSectionLetter,
          number: newSectionNumber,
        };
      }

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
                    sectionLetter: newSectionLetter,
                    sectionNumber: newSectionNumber,
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
            <Form.Label>Section Letter</Form.Label>
            <Form.Select
              value={filters.sectionLetter}
              onChange={(e) => {
                const v = e.target.value;
                setFilters((p) => ({ ...p, sectionLetter: v }));
              }}
            >
              <option value="">All letters</option>
              {sectionLetters.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Form.Label>Section Number</Form.Label>
            <Form.Select
              value={filters.sectionNumber}
              onChange={(e) => {
                const v = e.target.value;
                setFilters((p) => ({ ...p, sectionNumber: v }));
              }}
            >
              <option value="">All numbers</option>
              {sectionNumbers.map((s) => (
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
                <option value="sectionLetter">Section Letter</option>
                <option value="sectionNumber">Section Number</option>
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
                <td>{it.sectionLetter}{it.sectionNumber}</td>
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
