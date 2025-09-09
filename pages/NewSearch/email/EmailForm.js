import React from 'react'

function EmailForm() {
  return (
    <div>EmailForm</div>
  )
}

export default EmailForm
// import { useState } from "react";
// import Firebase from "../../../context/Firebase"; // Adjust the path if your firebase.js is located elsewhere

// const db = Firebase.firestore();

// const EmailForm = () => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await db.collection("mail").add({
//         to: "isavchenko@advancedimagingparts.com",
//         message: {
//           subject: `Message from ${name}`,
//           text: description,
//           html: `<p>${description}</p>`,
//         },
//       });
//       alert("Email sent successfully!");
//     } catch (error) {
//       console.error("Error sending email: ", error);
//       alert("Error sending email");
//     }

//     setName("");
//     setDescription("");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Name:</label>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Description:</label>
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         ></textarea>
//       </div>
//       <button type="submit">Send</button>
//     </form>
//   );
// };

// export default EmailForm;
