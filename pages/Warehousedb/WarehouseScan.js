import React, { useEffect, useState } from "react";
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
    <Link href={`/${route}`}>
      <a
        className={`btn btn-${type}`}
        disabled={isLoading.name}
        onClick={!isLoading.name ? handleClick : null}
      >
        {isLoading.name ? "Loading…" : name}
      </a>
    </Link>
  );
}

export default function dashboard() {
  const { signOut } = useAuth();
  const [data, setData] = useState("No result");
  const [cameraFacing, setCameraFacing] = useState("environment"); // default to back camera
  const [scanning, setScanning] = useState(true);
  const router = useRouter();

  const readQR = (qrData) => {
    console.log("this is the qr data: " + qrData);
    router.push("../NewSearch/item/" + qrData);
    return qrData;
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
                  onUpdate={(err, result) => {
                    if (result && result.text !== "Not%20Found") {
                      setData(result.text);
                      setScanning(false); // Stop scanning once a valid barcode is found
                    }
                  }}
                  facingMode={cameraFacing}  // Add this to control the camera
                />
                <Button
                  variant={data === "No result" ? "danger" : "success"}
                  disabled={data === "No result"}
                >
                  {data === "No result"
                    ? "No code located"
                    : "Code located! " + readQR(data)}
                </Button>
                <button
                  onClick={() =>
                    setCameraFacing((prev) =>
                      prev === "environment" ? "user" : "environment"
                    )
                  }
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
