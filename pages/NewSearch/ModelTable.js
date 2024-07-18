import React from "react";
import { Table, Button } from "react-bootstrap";
import styles from "../../styles/ClientTable.module.css";

export default function ModelTable({ models, onSelectModel, clearSelection }) {
  return (
    <Table striped bordered hover size="sm" className={styles.modelTable}>
      <thead>
        <tr>
          <th>Model Name</th>
          <th>Select</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan="2" style={{ textAlign: "center" }}>
            <Button variant="secondary" onClick={clearSelection}>
              Clear Selection
            </Button>
          </td>
        </tr>
        {models.map((model, index) => (
          <tr key={index}>
            <td>{model}</td>
            <td>
              <Button variant="primary" onClick={() => onSelectModel(model)}>
                Select
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
