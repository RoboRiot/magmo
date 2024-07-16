import React from "react";
import { Table, Button } from "react-bootstrap";
import styles from "../../styles/ClientTable.module.css";

export default function ClientTable({ clients, onSelectClient, onInfoClick }) {
  return (
    <Table striped bordered hover size="sm" className={styles.clientTable}>
      <thead>
        <tr>
          <th>Client Name</th>
          <th>Info</th>
          <th>Select</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client) => (
          <tr key={client.id}>
            <td>{client.name}</td>
            <td>
              <Button
                variant="info"
                onClick={() => onInfoClick(client.id, client.name)}
              >
                Info
              </Button>
            </td>
            <td>
              <Button
                variant="primary"
                onClick={() => onSelectClient(client.name)}
              >
                Select
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
