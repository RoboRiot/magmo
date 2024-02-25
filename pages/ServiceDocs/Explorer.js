import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic';
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Card, Container, Table } from "react-bootstrap";
import styles from "../../styles/Home.module.css";

// import PdfViewer from '../../components/PdfViewer';

import Link from "next/link";

import { useAuth } from "../../context/AuthUserContext";
import firebase from "../../context/Firebase";

import LoggedIn from "./../LoggedIn";

const DynamicPdfViewer = dynamic(() => import('../../components/PdfViewer'), {
  ssr: false, // This disables server-side rendering for PdfViewer
});


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

let baseURL = ""

export default function dashboard() {
  const router = useRouter();

  const { signOut } = useAuth();
  const labels = ["folders", "←"];
  const fLabels = ["files"];

  const storage = firebase.storage().ref();
  let directoryRef = storage.child("/");

  //this is the file selected to open
  const [selectedFile, setSelectedFile] = useState(null);

  // const [baseURL, setURL] = useState(" ");

  const [info, setInfo] = useState({});
  const [items, setItems] = useState([{}]);

  useEffect(() => {
    fetchData("");
  }, [router.route]);

  const fetchData = async (url) => {
    let fileURLs = [];
    let fileNames = [];
    let folderNames = [];

    // setURL(baseURL + url)
    baseURL = baseURL + url
    console.log(baseURL)

    directoryRef = storage.child(baseURL);

    if (baseURL.length < 2) {
      directoryRef = storage.child("/");
    }

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

    const toSend = {
      folders: folderNames.map((name) => ({ folder: name })),
      files: fileNames.map((name) => ({ file: name })),
    };

    setInfo(toSend);
  };

  //this is style stuff for the table headers
  const [hoverIndex, setHoverIndex] = useState(null);
  const hoverStyle = (index) => ({
    backgroundColor: index === 1 && hoverIndex === index ? "#ddd" : "transparent",
    textAlign: "center",
    cursor: "default",
  });
  const goBack = () => {

    baseURL = baseURL.substring(0, baseURL.lastIndexOf('/'));
    fetchData("")

  }

  //handle openinng file
  const openFile = async (index) => {
    let filePath = baseURL + "/" + info.files[index].file
    console.log(filePath)

    const url = await getDownloadUrl(filePath);
    if (url) {
      setSelectedFile(url);
    } else {
      console.error("Failed to get PDF URL");
    }

    // const fileName = /* extract filename based on index */;
    // setSelectedFile(fileName);
  }

  const getDownloadUrl = async (filePath) => {
    const fileRef = storage.child(filePath);
    try {
      const url = await fileRef.getDownloadURL();
      return url;
    } catch (error) {
      console.error("Error fetching the download URL: ", error);
      return null;
    }
  }
  const closePdfViewer = () => {
    setSelectedFile(null);
  };
  return (
    <LoggedIn>
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card className="align-items-center justify-content-center">
            <Card.Body>
              <h2 className="text-center mb-4">Explorer</h2>
              <div className="d-grid gap-3">

                {selectedFile ? (
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <DynamicPdfViewer file={selectedFile} />
                    <button
                      style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        background: 'white',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer'
                      }}
                      onClick={closePdfViewer}
                    >
                      x
                    </button>
                  </div>
                ) : (
                  <>
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
                              onClick={() => goBack(index)}
                            >
                              {item}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {info.folders && info.folders.map((item, index) => (
                          <tr
                            class="clickable-row"
                            key={index}
                          >
                            <td
                              style={{ textAlign: "center", cursor: "default" }}
                              onClick={() => fetchData("/" + item.folder)}
                            >
                              {item.folder}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Table
                      style={{ width: "100%" }}
                      striped
                      bordered
                      hover
                      size="sm"
                    >
                      <thead>
                        <tr>
                          {fLabels.map((item, index) => (
                            <th>
                              {item}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {info.files && info.files.map((item, index) => (
                          <tr
                            class="clickable-row"
                            key={index}
                          >
                            <td
                              style={{ textAlign: "center", cursor: "default" }}
                              onClick={() => openFile(index)}
                            >
                              {item.file}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Button variant="link" onClick={signOut}>
                      Sign out
                    </Button>
                  </>
                )}

              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </LoggedIn>
  );
}
