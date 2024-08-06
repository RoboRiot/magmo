import React, { useEffect, useState } from "react";
import firebase from "../../../context/Firebase"; // Adjust the path according to your project structure
import "bootstrap/dist/css/bootstrap.min.css";

export default function DisplayImage() {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const imageRef = storageRef.child("Parts/AIS01234/AIS01234.png");

    imageRef
      .getDownloadURL()
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        console.error("Error fetching the image URL:", error);
      });
  }, []);

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="AIS01234" className="img-fluid" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
