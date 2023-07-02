import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Card, Container, Table,   NavDropdown, FormControl} from "react-bootstrap";
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

export default function WarehouseList() {
  const { signOut } = useAuth([]);
  const [info, setInfo] = useState([]);
  const [backupInfo, setBackupInfo] = useState([]);

  const [ids, setID] = useState([]);
  const db = firebase.firestore();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [dItem, setDItem] = useState()

  //search features//////
  const [select, setSelect] = useState("Name");
  const [showList, setShowList] = useState(false);
  const [showListSearch, setShowListSearch] = useState("text");
  const [search, setSearch] = useState();

  const showDropdown = (e) => {
    setShowList(!show);
  };
  const hideDropdown = (e) => {
    setShowList(false);
  };

  const searchChangeHandler = (event) => {
    setSearch(event.target.value);
  }

  function searchFilter() {
    var temp = [];
    backupInfo.map((item) => {
      console.log(select)
      if (select == "Name") {

        if (item.name.toLowerCase().indexOf(search.toLowerCase()) > -1) {
          temp.push(item);
          console.log("enter1");
        }
      }
      if(select == "Date"){
        console.log(item.date.split('/') + " : " + search.split('-'))
      }
    });
    
    console.log(temp);
    setLabels(labelBase)
    setSortCheck(sortCheckBase)
    setInfo(temp)
  }

  //////sorting items//////
  const labelBase = ["name","date","w/o","p/n","s/n","desc"]
  const sortCheckBase = [false,false,false,false,false,false]
  const [labels, setLabels] = useState(labelBase)
  const [sortCheck, setSortCheck] = useState(sortCheckBase);
  const hold = "↓↑"
  function nameSortCheck(){
    if(!sortCheck[0]){
      let sortedItems = info.sort((a, b) => a.name.localeCompare(b.name));
      setLabels(["name ↓", ...labels.slice(1)]);
      setInfo(sortedItems)
      setSortCheck([true, ...sortCheck.slice(1)])
    }
    else{
      let sortedItems = info.sort((a, b) => b.name.localeCompare(a.name));
      setLabels(["name ↑", ...labels.slice(1)]);
      setInfo(sortedItems)
      setSortCheck([false, ...sortCheck.slice(1)])
    }
  }
  function woSortCheck(){
    if(!sortCheck[1]){
      let sortedItems = info.sort((a, b) => a.wo.localeCompare(b.name));
      setLabels([...prevLabels.slice(0, 2), "w/o ↓", ...labels.slice(3)]);
    }
    else{

    }

  }


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
    setBackupInfo((oldArray) => [...oldArray, ...data]);
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
                    <th onClick={nameSortCheck}>{labels[0]}</th>
                    <th>{labels[1]}</th>
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
                      <td
                        style={{ textAlign: "center", cursor: "default" }}
                        onClick={() => rowSelect(ids[index])}
                      >
                        {item.name}
                      </td>

                      <td
                        style={{ textAlign: "center", cursor: "default" }}
                        onClick={() => rowSelect(ids[index])}
                      >
                        {" "}
                        {item.date}{" "}
                      </td>
                      <td
                        style={{ textAlign: "center", cursor: "default" }}
                        onClick={() => rowSelect(ids[index])}
                      >
                        {" "}
                        {item.wo}{" "}
                      </td>
                      <td
                        style={{ textAlign: "center", cursor: "default" }}
                        onClick={() => rowSelect(ids[index])}
                      >
                        {" "}
                        {item.pn}{" "}
                      </td>
                      <td
                        style={{ textAlign: "center", cursor: "default" }}
                        onClick={() => rowSelect(ids[index])}
                      >
                        {" "}
                        {item.sn}{" "}
                      </td>
                      <td
                        style={{ textAlign: "center", cursor: "default" }}
                        onClick={() => rowSelect(ids[index])}
                      >
                        {" "}
                        {item.desc}{" "}
                      </td>

                      {/* <td>
                        {LoadingButton(
                          "secondary",
                          "X",
                          "Warehousedb/ModItem"
                        )}
                      </td> */}
                      <td style={{ textAlign: "center" }}>
                        <Button
                          onClick={() =>
                            checkDelete(index, ids[index], item.name)
                          }
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
              <Form className="d-flex" style={{ paddingBottom: "10px"}}>
                <FormControl
                  type={showListSearch}
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={search}
                  onChange={searchChangeHandler}
                />
                <NavDropdown
                  title={select}
                  id="collasible-nav-dropdown"
                  show={showList}
                  onMouseEnter={showDropdown}
                  onMouseLeave={hideDropdown}
                 
                >
                  <NavDropdown.Item href="" onClick={() => setSelect("Name") & setShowListSearch("text")}>
                    Name
                  </NavDropdown.Item>
                  <NavDropdown.Item href="" onClick={() => setSelect("Date") & setShowListSearch("date")}>
                    Date
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href=""
                    onClick={() => setSelect("Work Order") & setShowListSearch("number")}
                  >
                    Work Order
                  </NavDropdown.Item>
                </NavDropdown>
                <Button variant="info" onClick={searchFilter}>Search</Button>
              </Form>
              {LoadingButton(
                "secondary",
                "Add New Item",
                "Warehousedb/ModItem"
              )}
              <a style={{ paddingLeft: "10px", paddingRight: "10px" }}></a>{" "}
              {LoadingButton("primary", "Back", "Warehousedb/WarehouseSelect")}
            </Card.Body>
          </Card>
        </div>
      </Container>
    </LoggedIn>
  );
}
