import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import { Form, Button, Card, Container } from "react-bootstrap";

// import BarcodeScannerComponent from "react-qr-barcode-scanner";
import dynamic from 'next/dynamic';

// This will only load the component on the client-side.
const BarcodeScannerComponent = dynamic(
  () => import('react-qr-barcode-scanner'),
  { ssr: false }
);

import { useAuth } from "../../context/AuthUserContext";
import LoggedIn from "../LoggedIn";
import storageUnitContract from "../../lib/inventory/storageUnitContract.cjs";

const { resolveScanDestination } = storageUnitContract;

function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

function LoadingButton({ type, name, route }) {
  const [isLoading, setLoading] = useState({ name: false });

  useEffect(() => {
    if (isLoading.name) {
      simulateNetworkRequest().then(() => {
        setLoading({ name: false });
      });
    }
  }, [isLoading.name]);

  const handleClick = () => setLoading({ name: true });

  return (
    <Link
      href={`/${route}`}
      className={`btn btn-${type}`}
      disabled={isLoading.name}
      onClick={!isLoading.name ? handleClick : null}>

      {isLoading.name ? "Loading…" : name}

    </Link>
  );
}

export default function dashboard() {
  const { signOut } = useAuth();
  const [data, setData] = useState("No result");
  const [scanError, setScanError] = useState("");
  const [cameraFacing, setCameraFacing] = useState("environment"); // default to back camera
  const [scanning, setScanning] = useState(true);
  const scanLockedRef = useRef(false);
  const router = useRouter();

  const resetScanner = () => {
    scanLockedRef.current = false;
    setData("No result");
    setScanError("");
    setScanning(true);
  };

  const handleScanUpdate = async (_error, result) => {
    if (!scanning || scanLockedRef.current || !result) return;

    const scannedValue =
      typeof result.getText === "function" ? result.getText() : result.text;
    const resolved = resolveScanDestination(scannedValue);
    if (!resolved) return;

    scanLockedRef.current = true;
    setScanning(false);
    setData(resolved.id);
    setScanError("");

    try {
      const navigated = await router.push(resolved.destination);
      if (navigated === false) {
        throw new Error("Navigation was cancelled.");
      }
    } catch (navigationError) {
      console.error("Unable to open the scanned record:", navigationError);
      scanLockedRef.current = false;
      setData("No result");
      setScanning(true);
      setScanError("The scanned record could not be opened. Please try again.");
    }
  };

  return (
    <LoggedIn>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card className="align-items-center justify-content-center">
            <Card.Body>
              <h2 className="text-center mb-4">Main Menu</h2>
              <div className="d-grid gap-3">
                <BarcodeScannerComponent
                  width="100%"
                  height={300}
                  onUpdate={handleScanUpdate}
                  onError={(error) => {
                    console.error("Camera scanner error:", error);
                    setScanError(
                      "Camera access failed. Check browser permissions and try again."
                    );
                  }}
                  facingMode={cameraFacing}  // Add this to control the camera
                  stopStream={!scanning}
                />
                <Button
                  variant={data === "No result" ? "danger" : "success"}
                  disabled
                >
                  {data === "No result"
                    ? "No code located"
                    : `Code located! ${data}`}
                </Button>
                {scanError && <div className="text-danger">{scanError}</div>}
                {!scanning && (
                  <Button variant="outline-primary" onClick={resetScanner}>
                    Scan again
                  </Button>
                )}
                <button
                  type="button"
                  onClick={() =>
                    setCameraFacing((prev) =>
                      prev === "environment" ? "user" : "environment"
                    )
                  }
                  disabled={!scanning}
                >
                  Flip Camera
                </button>
                <LoadingButton
                  type="primary"
                  name="Back"
                  route="Warehousedb/WarehouseSelect"
                />
                <Button variant="link" onClick={signOut}>
                  Sign out
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </LoggedIn>
  );
}
