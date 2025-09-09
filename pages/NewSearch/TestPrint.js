import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Container } from "react-bootstrap";
import { useRouter } from "next/router";
import LoggedIn from "../LoggedIn";

const BluetoothPrint = () => {
  const [status, setStatus] = useState("Not Connected");
  const router = useRouter();

  // Function to scan for available services
  const scanBluetoothServices = async () => {
    try {
      setStatus("Requesting Bluetooth Device...");
      console.log("Requesting Bluetooth Device...");
  
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: false,
        filters: [{ name: "ZD621-LAKEFOREST" }],
        optionalServices: ["00001801-0000-1000-8000-00805f9b34fb", "00001800-0000-1000-8000-00805f9b34fb"] // Found services
      });
  
      console.log(`Connected to ${device.name}`);
      setStatus(`Connected to ${device.name}`);
  
      const server = await device.gatt.connect();
      console.log("Connected to GATT Server!");
  
      // Get Generic Access service and log its characteristics
      const accessService = await server.getPrimaryService("00001800-0000-1000-8000-00805f9b34fb");
      const accessCharacteristics = await accessService.getCharacteristics();
      console.log("Generic Access Characteristics:", accessCharacteristics.map(c => c.uuid));
  
      // Get Generic Attribute service and log its characteristics
      const attributeService = await server.getPrimaryService("00001801-0000-1000-8000-00805f9b34fb");
      const attributeCharacteristics = await attributeService.getCharacteristics();
      console.log("Generic Attribute Characteristics:", attributeCharacteristics.map(c => c.uuid));
  
      setStatus("Characteristics scanned. Check console.");
  
    } catch (error) {
      console.error("Error:", error);
      setStatus(`Error: ${error.message}`);
    }
  };
  
  // Function to print a label using the correct service UUID
  const printLabel = async () => {
    try {
      setStatus("Requesting Bluetooth Device...");

      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: false,
        filters: [{ name: "ZD621-LAKEFOREST" }],
        optionalServices: ["49535343-fe7d-4ae5-8fa9-9fafd205e455"] // Use the correct UUID found from scan
      });

      const server = await device.gatt.connect();
      setStatus("Connected to GATT Server");

      // Use the correct UUID from your scan results
      const service = await server.getPrimaryService("49535343-fe7d-4ae5-8fa9-9fafd205e455");
      const characteristic = await service.getCharacteristic("49535343-1e4d-4bd9-ba61-23c647249616");

      const zpl = "^XA^FO50,50^A0N,50,50^FDTest Print^FS^XZ";
      const encoder = new TextEncoder();
      const data = encoder.encode(zpl);

      await characteristic.writeValue(data);
      setStatus("Label Sent to Printer!");

    } catch (error) {
      console.error("Error:", error);
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <LoggedIn>
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card className="align-items-center justify-content-center">
            <Card.Body>
              <h2 className="text-center mb-4">Print via Bluetooth</h2>
              <Button variant="primary" className="mb-3" onClick={scanBluetoothServices}>
                Scan for Available Services
              </Button>
              <Button variant="primary" className="mb-3" onClick={printLabel}>
                Connect & Print Label
              </Button>
              <p>Status: {status}</p>
              <Button variant="secondary" onClick={() => router.back()}>
                Back
              </Button>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </LoggedIn>
  );
};

export default BluetoothPrint;
