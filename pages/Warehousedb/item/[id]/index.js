import { useRouter } from "next/router";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import styles from "../../../../styles/Home.module.css";

import { useAuth } from "../../../../context/AuthUserContext";
import firebase from "../../../../context/Firebase";

// import { useCollection } from "react-firebase-hooks/firebase";

import LoggedIn from "../../../LoggedIn";


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
 
const article = () => {

  const router = useRouter();
  const { id } = router.query;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { signOut } = useAuth();

  const [items, setItems] = useState({jasper: {
    name: "",
    wo: "",
    pn: "",
    sn: "",
    date: "",
    desc: "",
  }});

  const db = firebase.firestore();

  const [info, setInfo] = useState([]);
  const [ids, setID] = useState([]);

  //
  //
  //functions for sending item
  //
  //

  async function toSend(){
   
    await db
      .collection("Test").add(items["jasper"]).then(() => {
        console.log('Items added!');
        // router.reload("WarehouseList")
        window.location = "WarehouseList"
        // router.push("WarehouseList")
        
      });
  }

  async function handleSubmit(event) {   
    // const router = useRouter()

    console.log("enter handle submit")
    console.log(items)
    var check = false

    if(items["jasper"]["name"]==""){
      console.log("error!!!!! name")
      check=true
    }
    if(items["jasper"]["wo"]==""){
      console.log("error!!!!! work order")
      check=true
    }
    if(items["jasper"]["pn"]==""){
      console.log("error!!!!! product number")
      check=true
    }
    if(items["jasper"]["sn"]==""){
      console.log("error!!!!! serial number")
      check=true
    }
    if(items["jasper"]["date"]==""){
      console.log("error!!!!! date")
      check=true
    }
    if(items["jasper"]["desc"]==""){
      console.log("error!!!!! description")
      check=true
    }

    if(check){
      console.log("entered")
      handleShow()
    }
    else{
      console.log("try submit")
      console.log(items)
      toSend()
      
    }
   

    event.preventDefault();
  }
  const nameChangeHandler = (event) => {
    setItems(prevState => {
      let jasper = Object.assign({}, prevState.jasper);  // creating copy of state variable jasper
      jasper.name = event.target.value;                     // update the name property, assign a new value                 
      return { jasper };                                 // return new object jasper object
    })
  }
  const woChangeHandler = (event) => {
    setItems(prevState => {
      let jasper = Object.assign({}, prevState.jasper);  // creating copy of state variable jasper
      jasper.wo = event.target.value;                     // update the name property, assign a new value                 
      return { jasper };                                 // return new object jasper object
    })
  }
  const pnChangeHandler = (event) => {
    setItems(prevState => {
      let jasper = Object.assign({}, prevState.jasper);  // creating copy of state variable jasper
      jasper.pn = event.target.value;                     // update the name property, assign a new value                 
      return { jasper };                                 // return new object jasper object
    })
  }
  const snChangeHandler = (event) => {
    setItems(prevState => {
      let jasper = Object.assign({}, prevState.jasper);  // creating copy of state variable jasper
      jasper.sn = event.target.value;                     // update the name property, assign a new value                 
      return { jasper };                                 // return new object jasper object
    })
  }
  const dateChangeHandler = (event) => {
    setItems(prevState => {
      let jasper = Object.assign({}, prevState.jasper);  // creating copy of state variable jasper
      // jasper.date = event.target.value;                     // update the name property, assign a new value                 
      const date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0))
      jasper.date = date
      return { jasper };                                 // return new object jasper object
    })
  }
  const descChangeHandler = (event) => {
    setItems(prevState => {
      let jasper = Object.assign({}, prevState.jasper);  // creating copy of state variable jasper
      jasper.desc = event.target.value;                     // update the name property, assign a new value                 
      return { jasper };                                 // return new object jasper object
    })
  }

 //
 //
 //functions for pulling item
 //
 //
 //

 // Start the fetch operation as soon as
  // the page loads
  if (typeof window !== "undefined") {
    window.addEventListener("load", () => {
      console.log("enter 1");
      fetchData();
      // displayData();
    });
  }

  async function fetchStuff() {
    let data = [];
    // let ids = [];
    const {realID} = router.query;
    console.log(realID)
    const cityRef = await db
      .collection("Test")
      .get()
      .then((querySnapshot) => {
        // Loop through the data and store
        // it in array to display
        querySnapshot.forEach((element) => {
          console.log("enter 2");
          console.log(element.id + ":" + id);
          // ids.push(element.id);
          if (element.id == id) {
            console.log("item found! " + id);
            data.push(element.data());
          }
        });
      });

    console.log(data);
    // setID(id);

    return data;
  }

  function toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
  }

  async function fetchData() {
    let datas = await fetchStuff();
    let data = datas
    // let data = {}
    // if(datas.length > 0){
    //   data = datas[0]
    // }
    
    let itemValue = [];
    let dateStorage = [];
    console.log(datas)



    data.map((elements) => 
      dateStorage.push(
        toDateTime(elements.date.seconds).getDate() +
          "/" +
          (toDateTime(elements.date.seconds).getMonth() + 1) +
          "/" +
          toDateTime(elements.date.seconds).getFullYear()
      )
    );
    
    for (const [index, value] of data.entries()) {
      data[index].date = dateStorage[index];
    }


    setInfo((oldArray) => [...oldArray, ...data]);
    // setID((oldArray) => [...oldArray, ...datas[1]]);
   
    info.map((item, index) =>
      setItems((prevState) => {
        let jasper = Object.assign({}, prevState.jasper); // creating copy of state variable jasper
        // jasper.date = event.target.value;                     // update the name property, assign a new value
        // const date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
        console.log(item.name)
        jasper.name = item.name;
        jasper.wo = item.wo;
        return { jasper }; // return new object jasper object
      })
    );

    console.log(info);
    // console.log(ids);
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
                <Button variant="secondary" href={"../WarehouseList"} >
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