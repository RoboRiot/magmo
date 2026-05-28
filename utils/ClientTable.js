import React from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import styles from "../styles/ClientTable.module.css";

const ClientTable = ({
  clients,
  onSelectClient,
  onInfoClick,
  clearSelection,
  onAddClient, // new prop for add-new-client action
  onDeleteClient,
  disableSelect,
  disableInfo,
  canDeleteClients,
  deletingClientId,
  isClientSearch,
  selectingClientId,
}) => {
  const columnCount =
    1 +
    (disableInfo ? 0 : 1) +
    (disableSelect ? 0 : 1) +
    (canDeleteClients ? 1 : 0);
  const showActions = Boolean(clearSelection || onAddClient);

  return (
    <Table striped bordered hover size="sm" className={styles.clientTable}>
      <thead>
        <tr>
          <th>Client Name</th>
          {!disableInfo && <th>Info</th>}
          {!disableSelect && <th>Select</th>}
          {canDeleteClients && <th>Delete</th>}
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
                  disabled={Boolean(selectingClientId)}
                  onClick={() => onSelectClient(client.id)}
                >
                  {selectingClientId === client.id ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Loading...
                    </>
                  ) : (
                    "Select"
                  )}
                </Button>
              </td>
            )}
            {canDeleteClients && (
              <td>
                <Button
                  variant="outline-danger"
                  disabled={Boolean(deletingClientId || selectingClientId)}
                  onClick={() => onDeleteClient?.(client)}
                >
                  {deletingClientId === client.id ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
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
