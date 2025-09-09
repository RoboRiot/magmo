import React from 'react'
import firebase from "../context/Firebase";

export async function fetchPartsWithMachineData() {
  const db = firebase.firestore();
  const partsSnapshot = await db.collection("Test").get();
  const parts = await Promise.all(
    partsSnapshot.docs.map(async (partDoc) => {
      const partData = partDoc.data();
      partData.id = partDoc.id; // Add document ID here
      // console.log(partData);
      if (
        partData.Machine &&
        partData.Machine instanceof firebase.firestore.DocumentReference
      ) {
        console.log(partData.Machine);
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

export async function fetchClients(selectedOEM, selectedModality) {
  const db = firebase.firestore();
  const clientsSnapshot = await db.collection("Client").get();
  const clients = clientsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Filter clients based on OEM and Modality if selected
  if (selectedOEM || selectedModality) {
    const filteredClients = [];
    for (const client of clients) {
      let match = true;
      if (selectedOEM || selectedModality) {
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
      }
      if (match) {
        filteredClients.push(client);
      }
    }
    return filteredClients;
  }

  return clients;
}

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

export function formatDate(timestamp) {
  if (!timestamp) return "";
  let date;
  if (timestamp.toDate) {
    date = timestamp.toDate();
  } else if (typeof timestamp === "string" || typeof timestamp === "number") {
    date = new Date(timestamp);
  } else {
    return ""; // handle unexpected formats
  }
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}
