// NewLocal.js
import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Stack } from "react-bootstrap";
import firebase from "../../../../context/Firebase";

export default function NewLocal({
  onSave = () => {},
  onCancel = () => {},
  selectedClient,
  showLocalLoc,
  value = {},
  onChange,
}) {
  const [regionOptions, setRegionOptions] = useState([]);
  const [sectionMap, setSectionMap]     = useState({});
  const [binCount, setBinCount]         = useState(0);
  const [palletCount, setPalletCount]   = useState(0);

  const [region, setRegion] = useState("");
  const [sectionLetter, setSectionLetter] = useState("");
  const [sectionNumber, setSectionNumber] = useState("");
  const [binSelected, setBinSelected]     = useState("");
  const [palletSelected, setPalletSelected] = useState("");

  // 1) load directory exactly as before
  useEffect(() => {
    if (!showLocalLoc) return;
    const db = firebase.firestore();
    db.collection("Warehouse").doc("directory").get().then(doc => {
      const d = doc.data() || {};
      setRegionOptions(d.Region   || []);
      setSectionMap   (d.Section  || {});
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

  // 3) notify parent on any change
  useEffect(() => {
    const p = {};
    if (region)         p.region  = region;
    if (sectionLetter && sectionNumber) p.section = { letter: sectionLetter, number: sectionNumber };
    if (binSelected)    p.bin     = parseInt(binSelected,10);
    if (palletSelected) p.pallet  = parseInt(palletSelected,10);
    onChange(p);
  }, [region, sectionLetter, sectionNumber, binSelected, palletSelected]);

  // helpers:
const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
const numbers = Array.from({ length: 50 }, (_, i) => i + 1);
  const binOptions = Array.from({ length: binCount }, (_, i) => i + 1);
  const palletOptions = Array.from({ length: palletCount }, (_, i) => i + 1);

  // bump and persist bin count
  const handleAddBin = async () => {
    const next = binCount + 1;
    await firebase.firestore()
      .collection("Warehouse").doc("directory")
      .update({ Bin: next });
    setBinCount(next);
    setBinSelected(next.toString());
  };

  // bump and persist pallet count
  const handleAddPallet = async () => {
    const next = palletCount + 1;
    await firebase.firestore()
      .collection("Warehouse").doc("directory")
      .update({ Pallet: next });
    setPalletCount(next);
    setPalletSelected(next.toString());
  };

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

  return (
    <div>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Region</Form.Label>
            <Form.Select
              value={region} onChange={e=>setRegion(e.target.value)}
            >
              <option value="">Select region</option>
              {regionOptions.map(r=> <option key={r} value={r}>{r}</option>)}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Section Letter</Form.Label>
            <Form.Select
              value={sectionLetter}
              onChange={e=>setSectionLetter(e.target.value)}
              // disabled={!region}
            >
              <option value="">Letter</option>
              {letters.map(l=> <option key={l} value={l}>{l}</option>)}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Section Number</Form.Label>
            <Form.Select
              value={sectionNumber}
              onChange={e=>setSectionNumber(e.target.value)}
              // disabled={!region}
            >
              <option value="">Number</option>
              {numbers.map(n=> <option key={n} value={n}>{n}</option>)}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Form.Group>
            <Form.Label>Bin</Form.Label>
            <Stack direction="horizontal" gap={2}>
              <Form.Select
                value={binSelected}
                onChange={e => setBinSelected(e.target.value)}
                // disabled={!region}
              >
                <option value="">Select bin</option>
                {binOptions.map(b => <option key={b} value={b}>{b}</option>)}
              </Form.Select>
              <Button variant="outline-secondary" onClick={handleAddBin} >
                + Bin
              </Button>
            </Stack>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
          <Form.Label>Pallet</Form.Label>
          <Stack direction="horizontal" gap={2}>
          <Form.Select
            value={palletSelected}
            onChange={e =>setPalletSelected(e.target.value)}
              // disabled={!region}
            >
              <option value="">Select pallet</option>
                {palletOptions.map(p => <option key={p} value={p}>{p}</option>)}
              </Form.Select>
              <Button variant="outline-secondary" onClick={handleAddPallet} >
                + Pallet
              </Button>
            </Stack>
          </Form.Group>
        </Col>
      </Row>
      {/* OK / Cancel footer */}
      <Row className="mt-4">
        <Col>
          <div className="mt-3 text-end">
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleOk}>
              OK
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
