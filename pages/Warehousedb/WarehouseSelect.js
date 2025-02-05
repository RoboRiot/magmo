import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/Home.module.css";
import {
  Form,
  Button,
  Card,
  Container,
  FormControl,
  NavDropdown,
} from "react-bootstrap";
import { useAuth } from "../../context/AuthUserContext";
import LoggedIn from "../LoggedIn";
import Link from "next/link";

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

export default function WarehouseSelect() {
  const { signOut } = useAuth();
  const [show, setShow] = useState(false);

  //passsing variables to warehouse list
  // const [select, setSelect] = useState("Name");
  const [showList, setShowList] = useState(false);
  const [showListSearch, setShowListSearch] = useState("text");
  const [search, setSearch] = useState();
  const [select, setSelect] = useState("Name");

  const showDropdown = (e) => {
    setShow(!show);
  };
  const hideDropdown = (e) => {
    setShow(false);
  };

  const searchChangeHandler = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = () => {
    console.log(search, showListSearch);
    router.push("../NewSearch/mainSearch" + `?inputText=${search}&selectedType=${select}`);
  };

  const router = useRouter();

  return (
    <LoggedIn>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card className="align-items-center justify-content-center">
            <Card.Body>
              <h2 className="text-center mb-4">Warehouse DB</h2>
              <div className="d-grid gap-3">
                {LoadingButton("primary", "Scan", "Warehousedb/WarehouseScan")}

                {LoadingButton(
                  "secondary",
                  "Main List",
                  "../NewSearch/mainSearch"
                )}
                {LoadingButton(
                  "primary",
                  "Client List",
                  "../NewSearch/clientSearch"
                )}
                {LoadingButton(
                  "secondary",
                  "Add New Item",
                  "../NewSearch/AddItem/NewItem"
                )}
                {LoadingButton(
                  "secondary",
                  "Test Print",
                  "../NewSearch/TestPrint"
                )}

                <Form className="d-flex">
                  <FormControl
                    type={showListSearch}
                    // type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={search}
                    onChange={searchChangeHandler}
                  />
                  <NavDropdown
                    title={select}
                    id="collasible-nav-dropdown"
                    show={show}
                    onMouseEnter={showDropdown}
                    onMouseLeave={hideDropdown}
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
                        setSelect("Product Number") &
                        setShowListSearch("number")
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
                  <Button variant="info" onClick={handleSubmit}>
                    Search
                  </Button>
                </Form>
                {LoadingButton("secondary", "Back <-", "dashboard")}
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </LoggedIn>
  );
}
