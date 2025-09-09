import React from "react";
import { Table, Button } from "react-bootstrap";
import styles from "../styles/ClientTable.module.css";

const ClientTable = ({
  clients,
  onSelectClient,
  onInfoClick,
  clearSelection,
  onAddClient, // new prop for add-new-client action
  disableSelect,
  disableInfo,
  isClientSearch,
}) => {
  return (
    <Table striped bordered hover size="sm" className={styles.clientTable}>
      <thead>
        <tr>
          <th>Client Name</th>
          {!disableInfo && <th>Info</th>}
          {!disableSelect && <th>Select</th>}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan="3" style={{ textAlign: "center" }}>
            <Button variant="secondary" onClick={clearSelection}>
              Clear Selection
            </Button>
            {/* New Add New Client button */}
            <Button variant="primary" onClick={onAddClient} className="ms-2">
              Add New Client
            </Button>
          </td>
        </tr>
        {clients.map((client) => (
          <tr key={client.id}>
            <td>{client.name}</td>
            {!disableInfo && (
              <td>
                <Button
                  variant="info"
                  onClick={() => onInfoClick(client.id, client.name)}
                >
                  {isClientSearch ? "Edit" : "Info"}
                </Button>
              </td>
            )}
            {!disableSelect && (
              <td>
                <Button
                  variant="primary"
                  onClick={() => onSelectClient(client.id)}
                >
                  Select
                </Button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ClientTable;
