import React from "react";
import { Form, InputGroup } from "react-bootstrap";

export default function ItemMovementDateField({ items, setItems }) {
  const movementDateType =
    items?.movementDateType === "departure" ? "departure" : "arrival";
  const dateField =
    movementDateType === "departure" ? "departure_date" : "arrival_date";

  return (
    <Form.Group controlId="movementDate">
      <Form.Label>Arrival / Departure Date</Form.Label>
      <InputGroup>
        <Form.Select
          value={movementDateType}
          onChange={(event) => {
            const value =
              event.target.value === "departure" ? "departure" : "arrival";
            setItems((prev) => ({
              ...prev,
              movementDateType: value,
            }));
          }}
          style={{ maxWidth: "130px" }}
        >
          <option value="arrival">Arrival</option>
          <option value="departure">Departure</option>
        </Form.Select>
        <Form.Control
          placeholder="Enter date"
          type="date"
          value={items?.[dateField] || ""}
          onChange={(event) => {
            const value = event.target.value;
            setItems((prev) => ({
              ...prev,
              [dateField]: value,
            }));
          }}
        />
      </InputGroup>
    </Form.Group>
  );
}
