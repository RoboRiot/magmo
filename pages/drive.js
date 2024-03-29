import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Form,
  Button,
  Card,
  Container,
  Tab,
  Row,
  Col,
  ListGroup,
} from "react-bootstrap";
import styles from "../styles/Home.module.css";

import { useAuth } from "../context/AuthUserContext";
import LoggedIn from "./LoggedIn";

import { getStorage, ref, listAll } from "firebase/storage";

export default function dashboard() {
  const { signOut } = useAuth();
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);

  const storage = getStorage();
  const listRef = ref(storage, "/");

  const list = useRef();
  // const buttonList = items.map((itemName) => loadingButton("primary",itemName.folder,"/"))
  if (typeof window !== "undefined") {
    window.addEventListener("load", () => {
      console.log("enter 1");
      fetchData();
    });
  }

  // Find all the prefixes and items.
  async function fetchStuff() {
    console.log("enter 1 ");
    let itemList = [];

    await listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
          console.log("enter 2");
          console.log(itemList);
          itemList.push(folderRef.name)
          
        });
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          //   setItems("item", itemRef.name);
          console.log("enter 3");
          console.log(itemRef.name);
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        alert(error.message);
      });

    return itemList;
  };

  async function fetchData() {
    let data = await fetchStuff()

    console.log(data);
    setItems((oldArray) => [...oldArray, ...data]);

    console.log(items)
  }

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

  return (
    <LoggedIn>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "600px" }}>
          <Card>
            <Card.Body ref={list}>
              <h2 className="text-center mb-4">Drive</h2>
              <div class="d-grid gap-3">
                
                {LoadingButton("primary", "Info", "#")}
                <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                                    <Row>
                                        <Col sm={4}>
                                            <ListGroup>
                                                <ListGroup.Item action href="#link1">
                                                    Link 1
                                                </ListGroup.Item>
                                                <ListGroup.Item action href="#link2">
                                                    Link 2
                                                </ListGroup.Item>
                                                <Button >List</Button>
                                                {
                                                    items.map((val) => (
                                                        <h2>{val}</h2>
                                                    ))
                                                }
                                            </ListGroup>
                                        </Col>

                                    </Row>
                                </Tab.Container>

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
