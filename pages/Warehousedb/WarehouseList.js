import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Card, Container, Table } from "react-bootstrap";
import styles from "../../styles/Home.module.css";

import Modal from "react-bootstrap/Modal";

import { useAuth } from "../../context/AuthUserContext";
import firebase from "../../context/Firebase";

// import { useCollection } from "react-firebase-hooks/firebase";

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

const items = [
  { name: "xc2", date: "10-2-21", wo: "12345", pn: "12345", sn: "12345" },
  { name: "dsp", date: "10-2-21", wo: "12345", pn: "12345", sn: "12345" },
  { name: "gts", date: "10-2-21", wo: "12345", pn: "12345", sn: "12345" },
];

// function listItems() {
//   // console.log(items);
//   return items.map((item) => (
//     <tr>
//       <td>{item.name}</td>
//       <td>{item.date}</td>
//       <td>{item.wo}</td>
//       <td>{item.pn}</td>
//       <td>{item.sn}</td>
//       <td>{item.sn}</td>
//     </tr>
//   ));
// }

export default function WarehouseList() {
  const { signOut } = useAuth([]);
  const [info, setInfo] = useState([]);
  const [ids, setID] = useState([]);
  const db = firebase.firestore();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [dItem, setDItem] = useState()

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
    let id = [];

    const cityRef = await db
      .collection("Test")
      .get()
      .then((querySnapshot) => {
        // Loop through the data and store
        // it in array to display
        querySnapshot.forEach((element) => {
          console.log("enter 2");
          console.log(element.id);
          id.push(element.id);
          data.push(element.data());
        });
      });

    console.log(data);
    setID(id);
    console.log(ids);

    return [data, id];
  }

  function toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
  }

  async function fetchData() {
    let datas = await fetchStuff();
    let data = datas[0];

    let itemValue = [];
    let dateStorage = [];

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

    console.log(data);
    setInfo((oldArray) => [...oldArray, ...data]);
    setID((oldArray) => [...oldArray, ...datas[1]]);

    console.log(data);
    console.log(info);
    console.log(ids);
  }

  const rowSelect = (id) => {
    console.log(id);
    window.location = "item/" + id;
  };
  const [gPos, setGPos] = useState()
  let [gIde, setGIde] = useState()

  const checkDelete = (pos, ide, name) => {
    setDItem(name)
    setGPos(pos)
    setGIde(ide)
    console.log(gPos + "," + gIde)
    handleShow()
  }

  const deleteItem = () => {
    console.log(gPos + "," + gIde)
    setInfo(info.filter((o, i) => gPos !== i));
    const cityRef = db.collection("Test").doc(gIde).delete();
    handleClose()
  };

  return (
    <LoggedIn>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Would you like to delete "{dItem}"</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={deleteItem}>
            Yes
          </Button>
          <Button variant="primary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "600px" }}>
          <Card className="align-items-center justify-content-center">
            <Card.Body>
              <h2 className="text-center mb-4">Main Menu</h2>

              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>name</th>
                    <th>date</th>
                    <th>w/o</th>
                    <th>p/n</th>
                    <th>s/n</th>
                    <th>desc</th>
                    <th>delete</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {listItems()} */}
                  {info.map((item, index) => (
                    
                      <tr
                        class="clickable-row"
                        key={index}
                        // onClick={() => rowSelect(ids[index])}
                      >
                        
                        <td style={{textAlign: "center", cursor: 'default'}} onClick={() => rowSelect(ids[index])}>{item.name}</td>
                        
                        <td style={{textAlign: "center", cursor: 'default'}} onClick={() => rowSelect(ids[index])}> {item.date} </td>
                        <td style={{textAlign: "center", cursor: 'default'}} onClick={() => rowSelect(ids[index])}>  {item.wo} </td>
                        <td style={{textAlign: "center", cursor: 'default'}} onClick={() => rowSelect(ids[index])}> {item.pn} </td>
                        <td style={{textAlign: "center", cursor: 'default'}} onClick={() => rowSelect(ids[index])}> {item.sn} </td>
                        <td style={{textAlign: "center", cursor: 'default'}} onClick={() => rowSelect(ids[index])}> {item.desc} </td>
                        
                        {/* <td>
                        {LoadingButton(
                          "secondary",
                          "X",
                          "Warehousedb/ModItem"
                        )}
                      </td> */}
                        <td style={{textAlign: "center"}}>
                        <Button
                          onClick={() => checkDelete(index, ids[index],item.name)}
                          id={ids[index]}
                          variant="danger"
                        >
                          X
                        </Button>
                      </td>
                      </tr>
                      
                    
                  ))}

                  {/* <a>{info["TestField"]}</a> */}
                </tbody>
              </Table>
              {LoadingButton(
                "secondary",
                "Add New Item",
                "Warehousedb/ModItem"
              )}
            </Card.Body>
          </Card>
        </div>
      </Container>
    </LoggedIn>
  );
}
