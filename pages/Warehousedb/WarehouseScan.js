// import React, { Component } from "react";
// import dynamic from "next/dynamic";

// const QrReader = dynamic(() => import("react-qr-reader"), {
//   ssr: false,
// });

// class WarehouseScan extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       result: "Hold QR Code Steady and Clear to Scan",
//     };
//     this.handScan = this.handleScan.bind(this);
//   }

//   handleScan(result) {
//     this.setState({
//       result: data,
//     });
//   }

//   handleError(err) {
//     console.error(err);
//   }

//   render() {
//     const previewStyle = {
//       height: 700,
//       width: 1000,
//       display: "flex",
//       "justify-content": "center",
//     };

//     const camStyle = {
//       display: "flex",
//       justifyContent: "center",
//       marginTop: "-50px",
//     };

//     const textStyle = {
//       fontSize: "30px",
//       "text-align": "center",
//       marginTop: "-50px",
//     };

//     return (
//       <React.Fragment>
//         <div style={camStyle}>
//           <QrReader
//             delay={100}
//             style={previewStyle}
//             onError={this.handleError}
//             onScan={this.handleScan}
//           />
//         </div>
//         <p style={textStyle}>{this.state.result}</p>
//       </React.Fragment>
//     );
//   }
// }

// export default WarehouseScan;

import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Card, Container } from "react-bootstrap";
import styles from "../../styles/Home.module.css";
import { QrReader } from "react-qr-reader";

import { useAuth } from "../../context/AuthUserContext";
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

export default function dashboard() {
  const { signOut } = useAuth();
  const [data, setData] = useState("No result");

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
              <div class="d-grid gap-3">
                <QrReader
                  onResult={(result, error) => {
                    if (!!result) {
                      setData(result?.text);
                    }

                    if (!!error) {
                      console.info(error);
                    }
                  }}
                  style={{ width: "100%" }}
                />
                <Button variant={data === "No result" ? "danger" : "sucess"}>
                  {data === "No result" ? "No QR located" : "QR located!"}
                </Button>

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

// import React, { useState } from "react";
// import { QrReader } from "react-qr-reader";

// const Test = (props) => {
//   const [data, setData] = useState("No result");

//   return (
//     <>
//       <QrReader
//         onResult={(result, error) => {
//           if (!!result) {
//             setData(result?.text);
//           }

//           if (!!error) {
//             console.info(error);
//           }
//         }}
//         style={{ width: "100%" }}
//       />
//       <p>{data}</p>
//     </>
//   );
// };

// export default Test;
