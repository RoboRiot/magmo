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
  const columnCount =
    1 + (disableInfo ? 0 : 1) + (disableSelect ? 0 : 1);
  const showActions = Boolean(clearSelection || onAddClient);

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
        {showActions && (
          <tr className={styles.actionRow}>
            <td colSpan={columnCount}>
              <div className={styles.actionButtons}>
                {clearSelection && (
                  <Button variant="secondary" onClick={clearSelection}>
                    Clear Selection
                  </Button>
                )}
                {onAddClient && (
                  <Button
                    variant="primary"
                    onClick={onAddClient}
                    className="ms-2"
                  >
                    Add New Client
                  </Button>
                )}
              </div>
            </td>
          </tr>
        )}
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
