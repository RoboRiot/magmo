import React from "react";
import { Table, Button } from "react-bootstrap";
import { formatDate } from "./fetchAssociations"; // Import the formatDate function
import styles from "../../styles/PartTable.module.css"; // Ensure you have a CSS file for the part table

export default function PartTable({
  info,
  labels,
  ids,
  hoverStyle,
  sortCheckAll,
  checkDelete,
  rowSelect,
  setHoverIndex,
  hoverIndex,
}) {
  return (
    <div className={styles.scrollableTable}>
      <Table striped bordered hover size="sm" className="mb-0">
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
          </tr>
        </thead>
        <tbody>
          {info.map((item, index) => (
            <tr
              className="clickable-row"
              key={index}
              onClick={() => rowSelect(ids[index])}
            >
              <td
                style={{
                  textAlign: "center",
                  cursor: "default",
                }}
              >
                {item.name}
              </td>
              <td
                style={{
                  textAlign: "center",
                  cursor: "default",
                }}
              >
                {formatDate(item.date)}
              </td>
              <td
                style={{
                  textAlign: "center",
                  cursor: "default",
                }}
              >
                {item.wo}
              </td>
              <td
                style={{
                  textAlign: "center",
                  cursor: "default",
                }}
              >
                {item.pn}
              </td>
              <td
                style={{
                  textAlign: "center",
                  cursor: "default",
                }}
              >
                {item.sn}
              </td>
              <td style={{ textAlign: "center" }}>
                <Button
                  onClick={(e) => checkDelete(e, index, ids[index], item.name)}
                  id={ids[index]}
                  variant="danger"
                >
                  X
                </Button>
              </td>
            </tr>
          ))}
          {info.length < 10 &&
            Array.from({ length: 10 - info.length }).map((_, index) => (
              <tr key={`empty-${index}`}>
                <td colSpan={labels.length} style={{ textAlign: "center" }}>
                  &nbsp;
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
