import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Card, Container, Row, Col} from "react-bootstrap";
import styles from "../../styles/Home.module.css";
import Link from "next/link";

// import { useAuth } from "../context/AuthUserContext";

// import LoggedIn from "./LoggedIn";

function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

function LoadingButton(type, name, route) {
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

  const isExternal =
    route.startsWith("http://") || route.startsWith("https://");

  if (isExternal) {
    return (
      <a
        href={route}
        className={`btn btn-${type}`}
        disabled={isLoading}
        onClick={!isLoading ? handleClick : null}
      >
        {isLoading ? "Loading…" : name}
      </a>
    );
  } else {
    return (
      <Link href={route}>
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
}

export default function dashboard() {
  const [items, setItems] = useState({});
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = () => {
    console.log("submit");
  };

  const dateChangeHandler = (event) => {
    setItems(Object.assign({}, items, { date: event.target.value }));
  };

  //Buttons generate and function
  // Function to generate buttons
  function generateTimeButtons() {
    const buttonCount = 5; // for generating 5 buttons
    return Array.from({ length: buttonCount }, (_, index) => (
        <div className="my-2" key={index}>
            <Button 
                variant={index % 2 === 0 ? "primary" : "secondary"} 
                onClick={() => buttonClicked(index + 5)}
            >
                {index + 5}:00 PM - {index + 6}:00 PM
            </Button>
        </div>
    ));
}


  function buttonClicked(time) {
    alert("Button for " + time + ":00 PM clicked!");
  }

  //   const { signOut } = useAuth();
  return (
    // <LoggedIn>
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card className="align-items-center justify-content-center">
          <Card.Body>
            <h2 className="text-center mb-4">Schedule</h2>
            <div class="d-grid gap-3">
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="date">
                    {/* <Form.Label>Date</Form.Label> */}
                    <Form.Control
                      type="date"
                      value={items["date"]}
                      onChange={dateChangeHandler}
                      min={today}
                    />
                  </Form.Group>
                </Row>
                {/* Buttons generated using loop */}
                {items["date"] && generateTimeButtons()}
              </Form>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
    // </LoggedIn>
  );
}
