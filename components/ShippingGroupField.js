import React, { useEffect, useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import firebase from "../context/Firebase";
import { normalizeShippingGroupDocument } from "../utils/inventoryGroups";

export default function ShippingGroupField({
  itemId = "",
  value,
  onChange,
  disabled = false,
}) {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let cancelled = false;

    firebase
      .firestore()
      .collection("shipping_groups")
      .where("type", "==", "shipping")
      .get()
      .then((snapshot) => {
        if (cancelled) return;
        const nextGroups = snapshot.docs
          .map(normalizeShippingGroupDocument)
          .sort((left, right) => left.name.localeCompare(right.name));
        setGroups(nextGroups);
        setLoadError("");

        if (!value && itemId) {
          const currentGroup = nextGroups.find((group) =>
            group.itemIds.includes(String(itemId))
          );
          if (currentGroup) onChange(currentGroup.id);
        }
      })
      .catch((error) => {
        console.error("Could not load shipping groups", error);
        if (!cancelled) {
          setGroups([]);
          setLoadError("Shipping groups could not be loaded.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [itemId]);

  return (
    <Form.Group controlId="shippingGroup" className="mb-3">
      <Form.Label>Shipping Group</Form.Label>
      <Form.Select
        value={value || ""}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled || loading}
      >
        <option value="">
          {loading ? "Loading shipping groups..." : "Do not add to a group"}
        </option>
        {groups.map((group) => (
          <option key={group.id} value={group.id}>
            {group.name} ({group.itemIds.length} item
            {group.itemIds.length === 1 ? "" : "s"})
          </option>
        ))}
      </Form.Select>
      <Form.Text className={loadError ? "text-danger" : "text-muted"}>
        {loadError ||
          "The item will be added to this shipping group when you save."}
      </Form.Text>
      {loading && <Spinner animation="border" size="sm" className="ms-2" />}
    </Form.Group>
  );
}
