import firebase from "../../context/Firebase";

// Fetch parts with associated machine and client data
// Fetch parts with associated machine and client data
export async function fetchPartsWithMachineData() {
  const db = firebase.firestore();
  const partsSnapshot = await db.collection("Test").get();
  const parts = await Promise.all(
    partsSnapshot.docs.map(async (partDoc) => {
      const partData = partDoc.data();

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

// Fetch all clients and filter based on selected OEM or Modality
export async function fetchClients(selectedOEM, selectedModality) {
  const db = firebase.firestore();
  const clientsSnapshot = await db.collection("Client").get();

  const clients = await Promise.all(
    clientsSnapshot.docs.map(async (doc) => {
      const clientData = doc.data();

      const machines = await Promise.all(
        clientData.machines.map(async (machineRef) => {
          const machineDoc = await machineRef.get();
          return machineDoc.exists ? machineDoc.data() : {};
        })
      );

      const hasOEM = machines.some(
        (machine) => selectedOEM && machine.OEM === selectedOEM
      );
      const hasModality = machines.some(
        (machine) => selectedModality && machine.Modality === selectedModality
      );
      console.log(hasOEM);
      if ((!selectedOEM || hasOEM) && (!selectedModality || hasModality)) {
        return { id: doc.id, ...clientData };
      }
    })
  );

  return clients.filter((client) => client !== undefined); // Filter out undefined clients
}

// Fetch models based on selected filters and ensure uniqueness
export async function fetchModels(
  selectedOEM,
  selectedModality,
  selectedClient
) {
  const db = firebase.firestore();
  const machinesSnapshot = await db.collection("Machine").get();
  const models = {};
  const uniqueModels = [];

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

      if (isValid && machineData.Model && !models[machineData.Model]) {
        models[machineData.Model] = true;
        uniqueModels.push(machineData.Model);
      }
    })
  );

  return uniqueModels;
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
