import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from 'next/router';
import { Form, Button, Card, Container } from "react-bootstrap";
import styles from "../../styles/Home.module.css";
import { QrReader } from "react-qr-reader";

import { useAuth } from "../../context/AuthUserContext";
import LoggedIn from "../LoggedIn";


function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

function LoadingButton(type, name, route) {
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
    <a
      class={"btn btn-" + type}
      variant={type}
      href={"/" + route}
      disabled={isLoading.name}
      onClick={!isLoading.name ? handleClick : null}
    >
      {isLoading.name ? "Loading…" : name}
    </a>
  );
}
var test = "blank"


  




export default function dashboard() {
  const { signOut } = useAuth();
  const [data, setData] = useState("No result");

  const router = useRouter();

  const readQR = (qrData) => {
    console.log("this is the qr data: " + qrData);
    // router.push(`item/${qrData}`);
    window.location = "item/" + qrData;
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
              <div class="d-grid gap-3">
                <QrReader
                  onResult={(result, error) => {
                    if (!!result) {
                      console.log("found!!");
                      setData(result?.text);
                    }

                    // if (!!error) {
                    //   console.log("empty")
                    //   console.info(error);
                    // }
                  }}
                  style={{ width: "100%" }}
                />
                <Button variant={data === "No result" ? "danger" : "sucess"}>
                  {data === "No result"
                    ? "No QR located"
                    : "QR located! " + readQR(data)}
                </Button>

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
