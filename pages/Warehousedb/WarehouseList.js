import React, { useEffect, useState, useRef } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';

import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Card, Container, Table, NavDropdown, FormControl } from "react-bootstrap";
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
    // <a
    //   class={"btn btn-" + type}
    //   variant={type}
    //   href={"/" + route}
    //   disabled={isLoading.name}
    //   onClick={!isLoading.name ? handleClick : null}
    // >
    //   {isLoading.name ? "Loading…" : name}
    // </a>
    <Link href={`/${route}`}>
    <a className={`btn btn-${type}`} disabled={isLoading.name} onClick={!isLoading.name ? handleClick : null}>
      {isLoading.name ? "Loading…" : name}
    </a>
  </Link>
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

  const [dItem, setDItem] = useState();

  //search features//////
  const [select, setSelect] = useState("Name");
  const [showList, setShowList] = useState(false);
  const [showListSearch, setShowListSearch] = useState("text");
  const [search, setSearch] = useState();

  //This is getting input from warehouse select
  //needs to reload page
  const router = useRouter();

  useEffect(() => {
    
    if (backupInfo.length > 0 && search) {
      // Call the function here
      collectDataFromSearch();
    }
  }, [backupInfo]);

  const collectDataFromSearch = () => {
    // useEffect(() => {
    // checking if we have the query params and do something with it
    if (router.query.inputText && router.query.selectedType) {
      // const input = router.query.inputText;
      // const type = router.query.selectedType;
      // // window.location.reload();
      // // Now you have the input and type, you can do whatever you want with it
      // console.log(input, type);
      // setSelect(type);
      // setSearch(input);
      
      searchFilter();
    }
    else{
      console.log("no input from previous page")
    }
    // }, [router.query]);
  };

  //dropdown and search management
  const showDropdown = (e) => {
    setShowList(!show);
  };
  const hideDropdown = (e) => {
    setShowList(false);
  };

  const searchChangeHandler = (event) => {
    setSearch(event.target.value);
  };

  function searchFilter() {
    var temp = [];
    console.log("entered search filter")
    console.log(backupInfo)
    backupInfo.map((item) => {
      console.log(select);
      console.log(search)
      if (select == "Name") {
        if (item.name.toLowerCase().indexOf(search.toLowerCase()) > -1) {
          temp.push(item);
          console.log("enter Name");
        }
      }

      if (select == "Date") {
        const dateComponents = item.date.split("/");
        const paddedMonth = String(dateComponents[0]).padStart(2, "0"); // Ensure month has 2 digits
        const paddedDay = String(dateComponents[1]).padStart(2, "0"); // Ensure day has 2 digits

        const reformattedItemDate = `${dateComponents[2]}-${paddedMonth}-${paddedDay}`; // Convert to "YYYY-MM-DD"

        console.log(reformattedItemDate, search);

        if (reformattedItemDate === search) {
          temp.push(item);
          console.log("enterDate");
        }
      }

      if (select == "Work Order") {
        // WO for Work Order or whatever it stands for in your context
        if (Number(item.wo) === Number(search)) {
          temp.push(item);
          console.log("enterWO");
        }
      }

      if (select == "Product Number") {
        // WO for Work Order or whatever it stands for in your context
        if (Number(item.pn) === Number(search)) {
          temp.push(item);
          console.log("enterWO");
        }
      }

      if (select == "Description") {
        if (item.desc.toLowerCase().indexOf(search.toLowerCase()) > -1) {
          temp.push(item);
          console.log("enterDescription");
        }
      }

      // if (select == "Number") {
      //   const numberFromItem = item.split(",")[1].split(":")[1];
      //   if (Number(numberFromItem) === Number(search)) {
      //     temp.push(item);
      //     console.log("enter Number");
      //   }
      // }
    });

    console.log(temp);
    setLabels(labelBase);
    setSortCheck(sortCheckBase);
    setInfo(temp);
  }

  //////sorting items//////
  const labelBase = ["name", "date", "w/o", "p/n", "s/n", "desc"];
  const labelBaseNames = ["name", "date", "wo", "pn", "sn", "desc"];
  const sortCheckBase = [false, false, false, false, false, false];
  const [labels, setLabels] = useState(labelBase);
  const [sortCheck, setSortCheck] = useState(sortCheckBase);
  const hold = "↓↑";

  function sortCheckAll(pos) {
    if (!sortCheck[pos]) {
      info.sort((a, b) => {
        if (pos === 0 || pos === 5) {
          return a[labelBaseNames[pos]].localeCompare(b[labelBaseNames[pos]]);
        } else if (pos === 1) {
          return (
            Date.parse(a[labelBaseNames[pos]]) -
            Date.parse(b[labelBaseNames[pos]])
          );
        } else {
          return (
            Number(a[labelBaseNames[pos]]) - Number(b[labelBaseNames[pos]])
          );
        }
      });
      setLabels(labelBase);
      setLabels((prevLabels) => [
        ...prevLabels.slice(0, pos),
        labelBase[pos] + "↓",
        ...prevLabels.slice(pos + 1),
      ]);
      setSortCheck((prevSortCheck) =>
        prevSortCheck.map((_, index) => index === pos)
      );
    } else {
      info.sort((a, b) => Number(b.wo) - Number(a.wo));
      info.sort((a, b) => {
        if (pos === 0 || pos === 5) {
          return b[labelBaseNames[pos]].localeCompare(a[labelBaseNames[pos]]);
        } else if (pos === 1) {
          return (
            Date.parse(b[labelBaseNames[pos]]) -
            Date.parse(a[labelBaseNames[pos]])
          );
        } else {
          return (
            Number(b[labelBaseNames[pos]]) - Number(a[labelBaseNames[pos]])
          );
        }
      });
      setLabels((prevLabels) => [
        ...prevLabels.slice(0, pos),
        labelBase[pos] + "↑",
        ...prevLabels.slice(pos + 1),
      ]);
      setSortCheck((prevSortCheck) => [
        ...prevSortCheck.slice(0, pos),
        false,
        ...prevSortCheck.slice(pos + 1),
      ]);
    }
  }

  // Start the fetch operation as soon as
  // the page loads

  // if (typeof window !== "undefined") {
  useEffect(() => {
    // window.addEventListener("load", () => {
      console.log("enter 1");
      fetchData();
      // displayData();
      console.log("not too bad")
    // });
    // }
  }, [router.route]); // runs every time `router.route` changes

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
    if (router.query.inputText && router.query.selectedType) {
      const input = router.query.inputText;
      const type = router.query.selectedType;
      // window.location.reload();
      // Now you have the input and type, you can do whatever you want with it
      console.log(input, type);
      setSelect(type);
      setSearch(input);
    }

    let datas = await fetchStuff();
    let data = datas[0];

    let itemValue = [];
    let dateStorage = [];

    data.map((elements) =>
      dateStorage.push(
        toDateTime(elements.date.seconds).getMonth() +
          1 +
          "/" +
          toDateTime(elements.date.seconds).getDate() +
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
    // router.reload();

    
  }

  const rowSelect = (id) => {
    console.log(id);
    router.push("item/" + id);
  };
  const [gPos, setGPos] = useState();
  let [gIde, setGIde] = useState();

  const checkDelete = (pos, ide, name) => {
    setDItem(name);
    setGPos(pos);
    setGIde(ide);
    console.log(gPos + "," + gIde);
    handleShow();
  };

  const deleteItem = () => {
    console.log(gPos + "," + gIde);
    setInfo(info.filter((o, i) => gPos !== i));
    const cityRef = db.collection("Test").doc(gIde).delete();
    handleClose();
  };

  //styling
  const [hoverIndex, setHoverIndex] = useState(null);
  const hoverStyle = (index) => ({
    backgroundColor: hoverIndex === index ? "#ddd" : "transparent", // Change colors as needed
    textAlign: "center",
    cursor: "default",
  });

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
      {/* <Container className="custom-container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}> */}
      <Container
        className={`${styles.myCustomContainer} d-flex align-items-center justify-content-center`}
        style={{ minHeight: "100vh", width: "100%" }}
      >
        <div className="w-100" style={{ maxWidth: "100%", margin: "0 auto" }}>
          <Card
            className="align-items-center justify-content-center"
            style={{ width: "100%" }}
          >
            <Card.Body style={{ width: "100%" }}>
              <h2 className="text-center mb-4">Main Menu</h2>
              <Table style={{ width: "100%" }} striped bordered hover size="sm">
                <thead>
                  <tr>
                    {labels.map((item, index) => (
                      <th
                        style={hoverStyle(index)}
                        onMouseOver={() => setHoverIndex(index)}
                        onMouseOut={() => setHoverIndex(null)}
                        onClick={() => sortCheckAll(index)}
                      >
                        {item}
                      </th>
                    ))}
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
              <Form className="d-flex" style={{ paddingBottom: "10px" }}>
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
                  style={{ marginTop: "-5px" }} // Adjust this value as needed
                >
                  <NavDropdown.Item
                    href=""
                    onClick={() =>
                      setSelect("Name") & setShowListSearch("text")
                    }
                  >
                    Name
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href=""
                    onClick={() =>
                      setSelect("Date") & setShowListSearch("date")
                    }
                  >
                    Date
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href=""
                    onClick={() =>
                      setSelect("Work Order") & setShowListSearch("number")
                    }
                  >
                    Work Order
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href=""
                    onClick={() =>
                      setSelect("Product Number") & setShowListSearch("number")
                    }
                  >
                    Product Number
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href=""
                    onClick={() =>
                      setSelect("Description") & setShowListSearch("text")
                    }
                  >
                    Description
                  </NavDropdown.Item>
                </NavDropdown>
                <Button variant="info" onClick={searchFilter}>
                  Search
                </Button>
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
