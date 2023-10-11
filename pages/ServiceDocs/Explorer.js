import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Card, Container, Table } from "react-bootstrap";
import styles from "../../styles/Home.module.css";
import Link from "next/link";

import { useAuth } from "../../context/AuthUserContext";
import firebase from "../../context/Firebase";

import LoggedIn from "./../LoggedIn";

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
      href={route}
      className={`btn btn-${type}`}
      disabled={isLoading.name}
      onClick={!isLoading.name ? handleClick : null}
    >
      {isLoading.name ? "Loading…" : name}
    </a>
  );
}

export default function dashboard() {
  const router = useRouter();

  const { signOut } = useAuth();
  const labels = ["name"];

  const storage = firebase.storage().ref();
  let directoryRef = storage.child("/");
  let baseURL = "";

  const [info, setInfo] = useState([{}]);

  useEffect(() => {
    fetchData("");
  }, [router.route]);

  const fetchData = async (url) => {
    let fileURLs = [];
    let fileNames = [];
    let folderNames = [];

    baseURL = baseURL + "/" + url;
    directoryRef = storage.child(url);

    await directoryRef
      .listAll()
      .then((res) => {
        let downloadURLPromises = [];

        // Get file references and their download URLs
        res.items.forEach((fileRef) => {
          fileNames.push(fileRef.name);
          // Push the download URL promises into an array
          downloadURLPromises.push(fileRef.getDownloadURL());
        });

        // Get folder names
        res.prefixes.forEach((folderRef) => {
          folderNames.push(folderRef.name);
        });

        // Wait for all download URLs to be fetched
        return Promise.all(downloadURLPromises);
      })
      .then((urls) => {
        fileURLs = urls;
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

    console.log("File Names:", fileNames);
    console.log("File URLs:", fileURLs);
    console.log("Folder Names:", folderNames);

    const toSend = folderNames.map((name) => ({ folder: name }));
    setInfo(toSend);
  };

  //this is style stuff for the table
  const [hoverIndex, setHoverIndex] = useState(null);
  const hoverStyle = (index) => ({
    backgroundColor: hoverIndex === index ? "#ddd" : "transparent", // Change colors as needed
    textAlign: "center",
    cursor: "default",
  });
  return (
    <LoggedIn>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card className="align-items-center justify-content-center">
            <Card.Body>
              <h2 className="text-center mb-4">Explorer</h2>
              <div className="d-grid gap-3">
                <Table
                  style={{ width: "100%" }}
                  striped
                  bordered
                  hover
                  size="sm"
                >
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
                    {info.map((item, index) => (
                      <tr
                        class="clickable-row"
                        key={index}
                        // onClick={() => rowSelect(ids[index])}
                      >
                        <td
                          style={{ textAlign: "center", cursor: "default" }}
                          onClick={() => fetchData(item.folder)}
                        >
                          {item.folder}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

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
