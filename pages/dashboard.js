import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Card, Container } from "react-bootstrap";
import styles from "../styles/Home.module.css";
import Link from "next/link";

import { useAuth } from "../context/AuthUserContext";
import { useRouter } from "next/router";

import LoggedIn from "./LoggedIn";

function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

function LoadingButton({ type, name, route, enable = true }) {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);

  // Guard against falsy route values
  if (!route) return null;

  const isExternal = route.startsWith('http://') || route.startsWith('https://');

  if (isExternal) {
    return (
      <a
        href={route}
        className={`btn btn-${type}`}
        disabled={!enable || isLoading}
        onClick={!isLoading ? handleClick : null}
        style={{ pointerEvents: !enable ? 'none' : 'auto', opacity: !enable ? 0.65 : 1 }}
      >
        {isLoading ? "Loading…" : name}
      </a>
    );
  } else {
    return (
      <Link href={route}>
        <a
          className={`btn btn-${type}`}
          disabled={!enable || isLoading}
          onClick={!isLoading ? handleClick : null}
          style={{ pointerEvents: !enable ? 'none' : 'auto', opacity: !enable ? 0.65 : 1 }}
        >
          {isLoading ? "Loading…" : name}
        </a>
      </Link>
    );
  }
}



export default function dashboard() {
  const { authUser, loading, signOut } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated and not still loading
  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/");
    }
  }, [authUser, loading, router]);

  // Show a loading message until auth state is determined
  if (loading || !authUser) {
    return (
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <h3>Loading...</h3>
      </Container>
    );
  }

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
                <LoadingButton
                  type="primary"
                  name="Service Docs"
                  route="ServiceDocs/ServiceSelect"
                  enable={false}
                />

                {/* <LoadingButton type="secondary" name="Logs" route="notes/gKeep" /> */}

                <LoadingButton
                  type="secondary"
                  name="MagMon"
                  route="http://mri.advancedimagingparts.com/login"
                />

                <LoadingButton
                  type="primary"
                  name="Warehouse db"
                  route="Warehousedb/WarehouseSelect"
                />

                {/* <LoadingButton
                  type="secondary"
                  name="Machines"
                  route="Warehousedb/WarehouseSelect"
                />

                <LoadingButton
                  type="primary"
                  name="Clients"
                  route="Warehousedb/WarehouseSelect"
                /> */}

                <LoadingButton
                  type="primary"
                  name="Interview"
                  route="schedule/interview"
                  enable={false}
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
