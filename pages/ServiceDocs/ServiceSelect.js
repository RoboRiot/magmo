import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, FormControl, Button, Card, Container } from "react-bootstrap";
import styles from "../../styles/Home.module.css";
import Link from "next/link";

import { useAuth } from "../../context/AuthUserContext";

import LoggedIn from "./../LoggedIn";

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
  const [search, setSearch] = useState();

  const searchChangeHandler = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = () => {
    console.log(search, showListSearch);
    router.push(`WarehouseList?inputText=${search}&selectedType=${select}`);
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
              <h2 className="text-center mb-4">Service Docs</h2>
              <div class="d-grid gap-3">
                <LoadingButton
                  type="primary"
                  name="Explorer"
                  route="ServiceDocs/Explorer"
                />

                <LoadingButton
                  type="secondary"
                  name="Google Keep"
                  route="http://mri.advancedimagingparts.com/login"
                />

                <Form className="d-flex">
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={search}
                    onChange={searchChangeHandler}
                  />
                  <Button variant="info" onClick={handleSubmit}>
                    Search
                  </Button>
                </Form>

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
