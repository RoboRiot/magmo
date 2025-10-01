import React, { useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { formatDate } from "./fetchAssociations";
import styles from "../styles/PartTable.module.css";


export default function PartTable({
  info,
  labels,
  ids,
  hoverStyle,
  sortCheckAll,
  checkDelete,
  isDeleting,
  rowSelect,
  setHoverIndex,
  hoverIndex,
  selectedItems,
  setSelectedItems,
}) {
  // const [selectedItems, setSelectedItems] = useState([]);

  // Toggle selection of items
  const handleSelectItem = (id) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter((itemId) => itemId !== id)
        : [...prevSelectedItems, id]
    );
  };

  // Handle delete button click for selected items
  const handleDeleteSelected = () => {
    if (selectedItems.length > 0) {
      checkDelete(null, null, selectedItems, "selected items");
    }
  };

  return (
    <div className={styles.scrollableTable}>
      <Table striped bordered hover size="sm" className={`mb-0 ${styles.fixedTable}`}>
        <thead className={styles.stickyHeader}>
          <tr>
            {labels.map((item, index) => (
              <th
                style={hoverStyle(index)}
                onMouseOver={() => setHoverIndex(index)}
                onMouseOut={() => setHoverIndex(null)}
                onClick={() => sortCheckAll(index)}
                key={index}
              >
                {item}
              </th>
            ))}
            <th className={styles.actionCol} style={{ textAlign: "center" }}>
              {selectedItems.length > 0 ? (
                <Button
                  variant="danger"
                  onClick={handleDeleteSelected}
                  disabled={isDeleting}
                  size="sm"
                >
                  Delete Selected ({selectedItems.length})
                </Button>
              ) : (
                "select"
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {info.map((item, index) => (
            <tr
              key={index}
              onClick={(e) => {
                // Only trigger rowSelect if the target is not a checkbox
                if (e.target.type !== "checkbox") {
                  rowSelect(item);
                }
              }}
              className="clickable-row"
            >
              <td style={{ textAlign: "center", cursor: "default" }}>
                <div className={styles.cellClamp} title={item.name}>
                  {item.name}
                </div>
              </td>
              <td style={{ textAlign: "center", cursor: "default" }}>
                <div className={styles.cellClamp} title={formatDate(item.date)}>
                  {formatDate(item.date)}
                </div>
              </td>
              <td style={{ textAlign: "center", cursor: "default" }}>
                <div
                  className={styles.cellClamp}
                  title={
                    item.workOrders && item.workOrders.length > 0
                      ? item.workOrders[item.workOrders.length - 1].workOrder
                      : "N/A"
                  }
                >
                  {item.workOrders && item.workOrders.length > 0
                    ? item.workOrders[item.workOrders.length - 1].workOrder
                    : "N/A"}
                </div>
              </td>
              <td style={{ textAlign: "center", cursor: "default" }}>
                <div className={styles.cellClamp} title={item.pn}>
                  {item.pn}
                </div>
              </td>
              <td style={{ textAlign: "center", cursor: "default" }}>
                <div className={styles.cellClamp} title={item.sn}>
                  {item.sn}
                </div>
              </td>
              <td className={styles.actionCol} style={{ textAlign: "center" }}>
                <Form.Check
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={(e) => {
                    e.stopPropagation(); // Prevent row click when checkbox is clicked
                    // Toggle selection using item.id directly
                    setSelectedItems((prevSelectedItems) =>
                      prevSelectedItems.includes(item.id)
                        ? prevSelectedItems.filter((id) => id !== item.id)
                        : [...prevSelectedItems, item.id]
                    );
                  }}
                  aria-label={`Select ${item.name}`}
                />
              </td>
            </tr>
          ))}
          {info.length < 10 &&
            Array.from({ length: 10 - info.length }).map((_, index) => (
              <tr key={`empty-${index}`}>
                <td colSpan={labels.length + 1} style={{ textAlign: "center" }}>
                  &nbsp;
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
