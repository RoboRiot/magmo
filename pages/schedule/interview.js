import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { Modal, Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import firebase from "../../context/Firebase";
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

export default function interview() {
  const [items, setItems] = useState({});
  const today = new Date().toISOString().split("T")[0];

  const [modalShow, setModalShow] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  const router = useRouter();
  const db = firebase.firestore();
  const [dates, setDates] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleModalClose = () => setModalShow(false);
  const handleModalShow = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setModalShow(true);
  };

  const handleSubmit = (event) => {
    // event.preventDefault();
    alert("Your timeslot has been saved \nYou will recieve an email confirmation once the interview is confirmed")
    const dateToSend = {
      name: name,
      email: email,
      date: new Date().toISOString(),
      Position: selectedTimeSlot
    }
    console.log("Name:", name, "Email:", email);
    console.log("submit");
    db.collection('Dates').doc(generateId(20)).set(dateToSend)
            .then(() => console.log('date sent'))
            .catch(error => console.error('Error sending date:', error));
  };

  //generate and id to send
  function generateId(length) {
    return [...Array(length)].map(() => Math.random().toString(36)[2]).join('');
  }

  // Fetch data when the component mounts or route changes
  useEffect(() => {
    fetchData();
  }, [router.route]);

  // Function to fetch dates from Firebase
  async function fetchClients() {
    let data = [];
    let id = [];

    await db.collection("Dates")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          id.push(element.id);
          data.push(element.data());
        });
      });

    return [data, id];
  }

  // Function to initiate fetching of data and setting state
  async function fetchData() {
    let [data, id] = await fetchClients();
    setDates(data.map((client, index) => ({ ...client, id: id[index] })));
  }

  const dateChangeHandler = (event) => {
    setItems(Object.assign({}, items, { date: event.target.value }));
  };

  //Buttons generate and function
  // Function to generate buttons
  function generateTimeButtons() {
    console.log(dates)
    const buttonCount = 10;
    return (
      <div className="d-flex flex-wrap">
        {Array.from({ length: buttonCount }, (_, index) => {
          const timeSlot = `${Math.floor(index * 0.5 + 5)}:${index % 2 === 0 ? "00" : "30"} PM - ${Math.floor(index * 0.5 + 5.5)}:${index % 2 === 0 ? "30" : "00"} PM`;
          const isDisabled = dates.some(date => date.Position === index);
          return (
            <div className="col-6 my-2" key={index}>
              <Button
                variant={index % 2 === 0 ? "primary" : "secondary"}
                onClick={() => handleModalShow(index)}
                disabled={isDisabled} // Disable button based on position match
              >
                {timeSlot}
              </Button>
            </div>
          );
        })}
      </div>
    );
  }

  function buttonClicked(pos) {
    alert("Pos: " + pos);
  }

  //   const { signOut } = useAuth();
  return (
    // <LoggedIn>
    <>
      <Modal show={modalShow} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book Time Slot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleModalClose}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card className="align-items-center justify-content-center">
            <Card.Body>
              <h2 className="text-center mb-4">Schedule</h2>
              <h5 className="text-center mb-4">Select a date and a time slot</h5>
              <div class="d-grid gap-3">
                <Form>
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
    </>
    // </LoggedIn>
  );
}
