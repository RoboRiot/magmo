import firebase from "../../context/Firebase";

// Fetch parts with associated machine data
export async function fetchPartsWithMachineData() {
  const db = firebase.firestore();
  const partsSnapshot = await db.collection("Test").get();
  const parts = await Promise.all(
    partsSnapshot.docs.map(async (partDoc) => {
      const partData = partDoc.data();
      if (partData.machine) {
        const machineDoc = await partData.machine.get();
        partData.machineData = machineDoc.data();
      } else {
        partData.machineData = {};
      }
      return partData;
    })
  );
  return parts;
}

// Fetch all clients
export async function fetchClients() {
  const db = firebase.firestore();
  const clientsSnapshot = await db.collection("Client").get();
  const clients = clientsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return clients;
}

// Format Firestore timestamp to date string
export function formatDate(timestamp) {
  if (!timestamp) return "";
  const date = timestamp.toDate();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}
