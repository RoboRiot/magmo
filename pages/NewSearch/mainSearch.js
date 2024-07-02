import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, InputGroup, Dropdown, FormControl, Table, Button, NavDropdown, Form } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import firebase from '../../context/Firebase';
import { useAuth } from '../../context/AuthUserContext';
import Modal from 'react-bootstrap/Modal';
import LoggedIn from '../LoggedIn';
import styles from '../../styles/Home.module.css';

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

export default function MainSearch() {
  const { signOut } = useAuth([]);
  const [info, setInfo] = useState([]);
  const [backupInfo, setBackupInfo] = useState([]);
  const [ids, setID] = useState([]);
  const db = firebase.firestore();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [dItem, setDItem] = useState();
  const [select, setSelect] = useState("Name");
  const [showList, setShowList] = useState(false);
  const [showListSearch, setShowListSearch] = useState("text");
  const [search, setSearch] = useState();
  const router = useRouter();
  const labelBase = ["name", "date", "w/o", "p/n", "s/n"];
  const labelBaseNames = ["name", "date", "wo", "pn", "sn"];
  const sortCheckBase = [false, false, false, false, false];
  const [labels, setLabels] = useState(labelBase);
  const [sortCheck, setSortCheck] = useState(sortCheckBase);
  const hold = "↓↑";
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    if (backupInfo.length > 0 && search) {
      collectDataFromSearch();
    }
  }, [backupInfo]);

  useEffect(() => {
    fetchData();
  }, [router.route]);

  const collectDataFromSearch = () => {
    if (router.query.inputText && router.query.selectedType) {
      searchFilter();
    }
  };

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
    backupInfo.map((item) => {
      if (select === "Name" && item.name.toLowerCase().indexOf(search.toLowerCase()) > -1) {
        temp.push(item);
      }
      if (select === "Date") {
        const dateComponents = item.date.split("/");
        const paddedMonth = String(dateComponents[0]).padStart(2, "0");
        const paddedDay = String(dateComponents[1]).padStart(2, "0");
        const reformattedItemDate = `${dateComponents[2]}-${paddedMonth}-${paddedDay}`;
        if (reformattedItemDate === search) {
          temp.push(item);
        }
      }
      if (select === "Work Order" && Number(item.wo) === Number(search)) {
        temp.push(item);
      }
      if (select === "Product Number" && Number(item.pn) === Number(search)) {
        temp.push(item);
      }
      if (select === "Description" && item.desc.toLowerCase().indexOf(search.toLowerCase()) > -1) {
        temp.push(item);
      }
    });
    setLabels(labelBase);
    setSortCheck(sortCheckBase);
    setInfo(temp);
  }

  function sortCheckAll(pos) {
    if (!sortCheck[pos]) {
      info.sort((a, b) => {
        if (pos === 0 || pos === 5) {
          return a[labelBaseNames[pos]].localeCompare(b[labelBaseNames[pos]]);
        } else if (pos === 1) {
          return Date.parse(a[labelBaseNames[pos]]) - Date.parse(b[labelBaseNames[pos]]);
        } else {
          return Number(a[labelBaseNames[pos]]) - Number(b[labelBaseNames[pos]]);
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
      info.sort((a, b) => {
        if (pos === 0 || pos === 5) {
          return b[labelBaseNames[pos]].localeCompare(a[labelBaseNames[pos]]);
        } else if (pos === 1) {
          return Date.parse(b[labelBaseNames[pos]]) - Date.parse(a[labelBaseNames[pos]]);
        } else {
          return Number(b[labelBaseNames[pos]]) - Number(a[labelBaseNames[pos]]);
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

  async function fetchStuff() {
    let data = [];
    let id = [];
    const cityRef = await db.collection("Test").get().then((querySnapshot) => {
      querySnapshot.forEach((element) => {
        id.push(element.id);
        data.push(element.data());
      });
    });
    setID(id);
    return [data, id];
  }

  function toDateTime(secs) {
    var t = new Date(1970, 0, 1);
    t.setSeconds(secs);
    return t;
  }

  async function fetchData() {
    if (router.query.inputText && router.query.selectedType) {
      const input = router.query.inputText;
      const type = router.query.selectedType;
      setSelect(type);
      setSearch(input);
    }
    let datas = await fetchStuff();
    let data = datas[0];
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
    setInfo((oldArray) => [...oldArray, ...data]);
    setBackupInfo((oldArray) => [...oldArray, ...data]);
    setID((oldArray) => [...oldArray, ...datas[1]]);
  }

  const rowSelect = (id) => {
    router.push("item/" + id);
  };

  const [gPos, setGPos] = useState();
  let [gIde, setGIde] = useState();

  const checkDelete = async (pos, ide, name) => {
    setDItem(name);
    setGPos(pos);
    setGIde(ide);
    handleShow();
  };

  const deleteItem = async () => {
    setInfo(info.filter((o, i) => gPos !== i));
    const cityRef = db.collection("Test").doc(gIde).delete();
    handleClose();
  };

  const hoverStyle = (index) => ({
    backgroundColor: hoverIndex === index ? "#ddd" : "transparent",
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
          <Button variant="primary" onClick={deleteItem}>Yes</Button>
          <Button variant="primary" onClick={handleClose}>No</Button>
        </Modal.Footer>
      </Modal>
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "1200px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">New Search</h2>
              <Row>
                <Col md={4}>
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <InputGroup className="mb-3" key={idx}>
                      <InputGroup.Text>{`Dropdown ${idx + 1}`}</InputGroup.Text>
                      <Dropdown>
                        <Dropdown.Toggle variant="outline-secondary" id={`dropdown-button-${idx + 1}`} className="w-100">
                          Select Option
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="w-100">
                          <FormControl
                            autoFocus
                            className="mx-3 my-2 w-auto"
                            placeholder="Type to search"
                            onChange={(e) => console.log(e.target.value)}
                          />
                          <Dropdown.Item eventKey="1">GE</Dropdown.Item>
                          <Dropdown.Item eventKey="2">Toshiba</Dropdown.Item>
                          <Dropdown.Item eventKey="3">Siemens</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </InputGroup>
                  ))}
                </Col>
                <Col md={8}>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        {labels.map((item, index) => (
                          <th
                            style={hoverStyle(index)}
                            onMouseOver={() => setHoverIndex(index)}
                            onMouseOut={() => setHoverIndex(null)}
                            onClick={() => sortCheckAll(index)}
                            key={index}
                          >
                            {item}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {info.map((item, index) => (
                        <tr
                          className="clickable-row"
                          key={index}
                          onClick={() => rowSelect(ids[index])}
                        >
                          <td style={{ textAlign: "center", cursor: "default" }}>{item.name}</td>
                          <td style={{ textAlign: "center", cursor: "default" }}>{item.date}</td>
                          <td style={{ textAlign: "center", cursor: "default" }}>{item.wo}</td>
                          <td style={{ textAlign: "center", cursor: "default" }}>{item.pn}</td>
                          <td style={{ textAlign: "center", cursor: "default" }}>{item.sn}</td>
                          <td style={{ textAlign: "center" }}>
                            <Button
                              onClick={() => checkDelete(index, ids[index], item.name)}
                              id={ids[index]}
                              variant="danger"
                            >
                              X
                            </Button>
                          </td>
                        </tr>
                      ))}
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
                      style={{ marginTop: "-5px" }}
                    >
                      <NavDropdown.Item href="" onClick={() => setSelect("Name") & setShowListSearch("text")}>Name</NavDropdown.Item>
                      <NavDropdown.Item href="" onClick={() => setSelect("Date") & setShowListSearch("date")}>Date</NavDropdown.Item>
                      <NavDropdown.Item href="" onClick={() => setSelect("Work Order") & setShowListSearch("number")}>Work Order</NavDropdown.Item>
                      <NavDropdown.Item href="" onClick={() => setSelect("Product Number") & setShowListSearch("number")}>Product Number</NavDropdown.Item>
                      <NavDropdown.Item href="" onClick={() => setSelect("Description") & setShowListSearch("text")}>Description</NavDropdown.Item>
                    </NavDropdown>
                    <Button variant="info" onClick={searchFilter}>Search</Button>
                  </Form>
                  {LoadingButton("secondary", "Add New Item", "Warehousedb/ModItem")}
                  <a style={{ paddingLeft: "10px", paddingRight: "10px" }}></a>
                  {LoadingButton("primary", "Back", "Warehousedb/WarehouseSelect")}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </LoggedIn>
  );
}
