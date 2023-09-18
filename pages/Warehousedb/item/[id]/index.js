import { useRouter } from "next/router";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import styles from "../../../../styles/Home.module.css";

import { useAuth } from "../../../../context/AuthUserContext";
import firebase from "../../../../context/Firebase";

import LoggedIn from "../../../LoggedIn";

//setup for loading buttons 
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
    <Link href={`/${route}`}>
    <a className={`btn btn-${type}`} disabled={isLoading.name} onClick={!isLoading.name ? handleClick : null}>
      {isLoading.name ? "Loading…" : name}
    </a>
  </Link>
  );
}

const article = () => {
  const router = useRouter();
  const { id } = router.query;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { signOut } = useAuth();

  const [items, setItems] = useState({});

  const db = firebase.firestore();

  const [info, setInfo] = useState([]);
  const [ids, setID] = useState([]);
  const [idSelect, setIDSelect] = useState([]);
  const selectedID = 0;
  const [newItem, setNewItem] = useState([false]);

  //
  //
  //functions for sending item
  //
  //
  async function toSend() {
    let tempDate = items.date;
    tempDate = new Date(tempDate.replace("-", ","));

    let returnData = Object.assign({}, items, { date: tempDate });

    console.log("this is the id: " + selectedID);

    // creates a new id incase the id does not exist
    if (newItem) {
      await db
        .collection("Test")
        .doc(idSelect)
        .set(returnData)
        .then(() => {
          console.log("Items added!");
          window.location = "../WarehouseList";
        });
    //uses an existing ID
    } else {
      await db
        .collection("Test")
        .doc(idSelect)
        .update(returnData)
        .then(() => {
          console.log("Items added!");
          window.location = "../WarehouseList";
        });
    }
  }

  //checks to make sure all fields are completed
  async function handleSubmit(event) {
    var check = false;

    if (items["name"] == "") {
      console.log("error!!!!! name");
      check = true;
    }
    if (items["wo"] == "") {
      console.log("error!!!!! work order");
      check = true;
    }
    if (items["pn"] == "") {
      console.log("error!!!!! product number");
      check = true;
    }
    if (items["sn"] == "") {
      console.log("error!!!!! serial number");
      check = true;
    }
    if (items["date"] == "") {
      console.log("error!!!!! date");
      check = true;
    }
    if (items["desc"] == "") {
      console.log("error!!!!! description");
      check = true;
    }

    if (check) {
      console.log("entered");
      handleShow();
    } else {
      console.log("try submit");
      console.log(items);
      toSend();
    }

    event.preventDefault();
  }

  //all the change handlers for the input boxes for the item
  const nameChangeHandler = (event) => {
    setItems(Object.assign({}, items, { name: event.target.value }));
   
  };
  const woChangeHandler = (event) => {
    setItems(Object.assign({}, items, { wo: event.target.value }));
   
  };
  const pnChangeHandler = (event) => {
    setItems(Object.assign({}, items, { pn: event.target.value }));

  };
  const snChangeHandler = (event) => {
    setItems(Object.assign({}, items, { sn: event.target.value }));
  };
  const dateChangeHandler = (event) => {
    setItems(Object.assign({}, items, { date: event.target.value }));
    console.log(items.date);
    
  };
  const descChangeHandler = (event) => {
    setItems(Object.assign({}, items, { desc: event.target.value }));
  
  };

  //
  //
  //functions for pulling item
  //
  //
  //

  // Start the fetch operation as soon as
  // the page loads
  // if (typeof window !== "undefined") {
  //   window.addEventListener("load", () => {
  useEffect(() => {
    console.log("enter 1");
    fetchData();
  }, [router.route]); // runs every time `router.route` changes

  // displayData();
  //   });
  // }

  async function fetchStuff() {
    let data = 0;
    let id = 0;

    const cityRef = await db
      .collection("Test")
      .get()
      .then((querySnapshot) => {
        // Loop through the data and store
        // it in array to display
        querySnapshot.forEach((element) => {
          // console.log("enter 2");
          // console.log(element.id);

          if (element.id == selectedID) {
            data = element.data();
            id = element.id;
          }
        });
      });

    // console.log(data);
    // setID(id);
    // console.log(ids);

    return [data, id];
  }

  function toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
  }

  async function fetchData() {
    selectedID = window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/") + 1
    );

    let datas = await fetchStuff();

    let data = datas[0];

    console.log(data);

    if (data == 0) {
      console.log("new item");
      setIDSelect(selectedID);
      setNewItem(true);
    } else {
      let itemValue = [];
      let dateStorage = [];
      let mSpace = "-";
      if (toDateTime(data.date.seconds).getMonth() + 1 < 10) mSpace = "-0";

      data.date =
        toDateTime(data.date.seconds).getFullYear() +
        mSpace +
        (toDateTime(data.date.seconds).getMonth() + 1) +
        "-" +
        toDateTime(data.date.seconds).getDate();

      console.log(data.date);
      // data.map((elements) =>
      //   dateStorage.push(
      //     toDateTime(elements.date.seconds).getFullYear() +
      //       "-" +
      //       (toDateTime(elements.date.seconds).getMonth() + 1) +
      //       "-" +
      //       toDateTime(elements.date.seconds).getDate()
      //   )
      // );

      // for (const [index, value] of data.entries()) {
      //   data[index].date = dateStorage[index];
      // }

      // let elementID = window.location.pathname.substring(
      //   window.location.pathname.lastIndexOf("/") + 1
      // );

      // datas[1].map((elements, index) => {
      //   if (elementID == elements) {
      //     data = data[index];
      //   }
      // });

      // console.log(data);
      // setInfo((oldArray) => [...oldArray, ...data]);
      // setInfo(data)
      setIDSelect(selectedID);
      setItems(data);
      // setID((oldArray) => [...oldArray, ...datas[1]]);

      // console.log(data.date);
      // console.log(datas[1]);
      // console.log(info);
      // console.log(ids);
    }
  }

  return (
    <LoggedIn>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Missing field</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card className="align-items-center justify-content-center">
            <Card.Body>
              <h2 className="text-center mb-4">Item</h2>

              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={items["name"]}
                      onChange={nameChangeHandler}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="wo">
                    <Form.Label>Work Order</Form.Label>
                    <Form.Control
                      type="number"
                      value={items["wo"]}
                      onChange={woChangeHandler}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="pn">
                    <Form.Label>Product Number</Form.Label>
                    <Form.Control
                      type="number"
                      value={items["pn"]}
                      onChange={pnChangeHandler}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="sn">
                    <Form.Label>Serial Number</Form.Label>
                    <Form.Control
                      type="number"
                      value={items["sn"]}
                      onChange={snChangeHandler}
                    />
                  </Form.Group>
                </Row>

                <Form.Group as={Col} controlId="date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={items["date"]}
                    onChange={dateChangeHandler}
                  />
                </Form.Group>
                <Form.Label></Form.Label>
                <Form.Group className="mb-3" controlId="desc">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    value={items["desc"]}
                    onChange={descChangeHandler}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit Changes
                </Button>
                <Button
                  className="m-3"
                  variant="secondary"
                  href={"../WarehouseList"}
                >
                  Go Back
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </LoggedIn>
  );
};

export default article;
