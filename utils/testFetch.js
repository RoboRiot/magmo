import firebase from "../context/Firebase";

/**
 * Fetches all documents from the "TestItem" collection, enriches each with its machine data
 * and client name, and returns an array of items.
 */
export async function fetchTestItemsWithMachineData() {
  const db = firebase.firestore();
  const partsSnapshot = await db.collection("TestItem").get();
  const parts = await Promise.all(
    partsSnapshot.docs.map(async (partDoc) => {
      const partData = partDoc.data();
      partData.id = partDoc.id;

      // If there's a Machine reference, fetch its data and client name
      if (
        partData.Machine &&
        partData.Machine instanceof firebase.firestore.DocumentReference
      ) {
        const machineDoc = await partData.Machine.get();
        partData.machineData = machineDoc.exists ? machineDoc.data() : {};
        if (partData.machineData.client) {
          const clientDoc = await partData.machineData.client.get();
          partData.machineData.Client = clientDoc.exists
            ? clientDoc.data().name
            : "";
        }
      } else {
        partData.machineData = {};
      }

      return partData;
    })
  );
  return parts;
}

/**
 * Fetches all clients, optionally filtering by OEM or modality.
 */
export async function fetchClients(selectedOEM, selectedModality) {
  const db = firebase.firestore();
  const clientsSnapshot = await db.collection("Client").get();
  const clients = clientsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (selectedOEM || selectedModality) {
    const filteredClients = [];
    for (const client of clients) {
      let match = true;
      for (const machineRef of client.machines) {
        const machineDoc = await machineRef.get();
        const machineData = machineDoc.data();
        if (
          (selectedOEM && machineData.OEM === selectedOEM) ||
          (selectedModality && machineData.Modality === selectedModality)
        ) {
          match = true;
          break;
        } else {
          match = false;
        }
      }
      if (match) filteredClients.push(client);
    }
    return filteredClients;
  }

  return clients;
}

/**
 * Fetches all machine models, optionally filtering by OEM, modality, or client.
 */
export async function fetchModels(
  selectedOEM,
  selectedModality,
  selectedClient
) {
  const db = firebase.firestore();
  const machinesSnapshot = await db.collection("Machine").get();
  const models = new Set();

  await Promise.all(
    machinesSnapshot.docs.map(async (machineDoc) => {
      const machineData = machineDoc.data();
      let isValid = true;

      if (selectedOEM && machineData.OEM !== selectedOEM) isValid = false;
      if (selectedModality && machineData.Modality !== selectedModality)
        isValid = false;
      if (selectedClient && machineData.client) {
        const clientDoc = await machineData.client.get();
        if (!clientDoc.exists || clientDoc.data().name !== selectedClient)
          isValid = false;
      }

      if (isValid) {
        models.add(machineData.Model);
      }
    })
  );

  return Array.from(models);
}

/**
 * Converts a Firestore timestamp or ISO/string/number into MM/DD/YYYY format.
 */
export function formatDate(timestamp) {
  if (!timestamp) return "";
  let date;
  if (timestamp.toDate) {
    date = timestamp.toDate();
  } else if (typeof timestamp === "string" || typeof timestamp === "number") {
    date = new Date(timestamp);
  } else {
    return "";
  }
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}
