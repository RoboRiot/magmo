import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Card, Container, Table } from "react-bootstrap";
import styles from "../../styles/Home.module.css";

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

function listItems() {
  // console.log(items);
  return items.map((item) => (
    <tr>
      <td>{item.name}</td>
      <td>{item.date}</td>
      <td>{item.wo}</td>
      <td>{item.pn}</td>
      <td>{item.sn}</td>
      <td>{item.sn}</td>
    </tr>
  ));
}

export default function WarehouseList() {
  const { signOut } = useAuth([]);
  const [info, setInfo] = useState([]);
  const [dates, setDates] = useState([]);

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
    const db = firebase.firestore();
    let data = [];

    const cityRef = await db
      .collection("Test")
      .get()
      .then((querySnapshot) => {
        // Loop through the data and store
        // it in array to display
        querySnapshot.forEach((element) => {
          console.log("enter 2");
          console.log(data);
          data.push(element.data());
        });
      });

    console.log(data);

    return data;
  }

  function toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
  }

  async function fetchData() {
    let data = await fetchStuff();
    let itemValue = [];
    let dateStorage = []
    // let names = [{ name: "george" }, { name: "bill" }, { name: "adam" }];
    data.map((elements) => (dateStorage.push( (toDateTime(elements.date.seconds).getMonth()+1) + "/" + toDateTime(elements.date.seconds).getDate() + "/" +  toDateTime(elements.date.seconds).getFullYear() ))) 
    setDates((oldArray) => [...oldArray, ...dateStorage]);

    // console.log(data);
    setInfo((oldArray) => [...oldArray, ...data]);

    console.log(info);
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

              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>name</th>
                    <th>date</th>
                    <th>w/o</th>
                    <th>p/n</th>
                    <th>s/n</th>
                    <th>desc</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {listItems()} */}
                  {info.map((item, index) => (
                    <tr>
                      <td>{item.name}</td>
                      <td>{dates[index]}</td>
                      <td>{item.pn}</td>
                      <td>{item.sn}</td>
                      <td>{item.wo}</td>
                      <td>{item.desc}</td>
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
