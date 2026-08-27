import React from "react";
import { Button, ButtonGroup, Form } from "react-bootstrap";

export const ITEM_ASSOCIATION_SITE = "site";
export const ITEM_ASSOCIATION_MACHINE = "machine";
export const ITEM_ASSOCIATION_TRAILER = "trailer";

export function inferItemAssociationType({ storedType, trailer, machine } = {}) {
  if (
    [
      ITEM_ASSOCIATION_SITE,
      ITEM_ASSOCIATION_MACHINE,
      ITEM_ASSOCIATION_TRAILER,
    ].includes(storedType)
  ) {
    return storedType;
  }
  if (trailer) return ITEM_ASSOCIATION_TRAILER;
  if (machine) return ITEM_ASSOCIATION_MACHINE;
  return ITEM_ASSOCIATION_SITE;
}

export function itemAssociationTypeForStorage({
  type,
  client,
  machine,
  trailer,
} = {}) {
  const clientId = String(client?.id || "").trim();
  const machineId = String(machine?.id || "").trim();
  const trailerId = String(trailer?.id || "").trim();

  if (!clientId) return "";
  if (type === ITEM_ASSOCIATION_TRAILER) {
    return machineId && trailerId ? ITEM_ASSOCIATION_TRAILER : "";
  }
  if (type === ITEM_ASSOCIATION_MACHINE) {
    return machineId ? ITEM_ASSOCIATION_MACHINE : "";
  }
  return ITEM_ASSOCIATION_SITE;
}

export function buildItemAssociationSnapshot({
  type,
  client,
  machine,
  trailer,
  effectiveAt = "",
  effectiveAtSource = "item-save",
  resolutionSource = "item-editor",
} = {}) {
  const associationType = itemAssociationTypeForStorage({
    type,
    client,
    machine,
    trailer,
  });
  if (!associationType) return null;

  return {
    schemaVersion: 2,
    associationType,
    clientId: String(client?.id || "").trim(),
    clientNameSnapshot: String(client?.name || "").trim(),
    clientLocationSnapshot: String(
      client?.location || client?.local || client?.clientLocation || ""
    ).trim(),
    machineId:
      associationType === ITEM_ASSOCIATION_SITE
        ? ""
        : String(machine?.id || "").trim(),
    machineNameSnapshot:
      associationType === ITEM_ASSOCIATION_SITE
        ? ""
        : String(machine?.name || "").trim(),
    trailerId:
      associationType === ITEM_ASSOCIATION_TRAILER
        ? String(trailer?.id || "").trim()
        : "",
    trailerNameSnapshot:
      associationType === ITEM_ASSOCIATION_TRAILER
        ? String(trailer?.name || "").trim()
        : "",
    effectiveAt: String(effectiveAt || "").trim(),
    effectiveAtSource: String(effectiveAtSource || "").trim(),
    resolutionSource: String(resolutionSource || "").trim(),
  };
}

export default function ItemAssociationTypeControl({
  value,
  onChange,
  disabled = false,
  hasTrailerOptions = true,
  branchLabel = "location",
}) {
  const options = [
    {
      value: ITEM_ASSOCIATION_SITE,
      label: "Site only",
      help: "Keep the client/site without tying this item to a scanner.",
    },
    {
      value: ITEM_ASSOCIATION_MACHINE,
      label: "Machine",
      help: "The item belongs to a machine at the selected site.",
    },
    {
      value: ITEM_ASSOCIATION_TRAILER,
      label: "Trailer",
      help: "The item belongs to a trailer and its linked machine.",
    },
  ];
  const selected = options.find((option) => option.value === value) || options[0];

  return (
    <Form.Group className="mb-3">
      <Form.Label>Associated asset ({branchLabel})</Form.Label>
      <div>
        <ButtonGroup size="sm" aria-label={`${branchLabel} association type`}>
          {options.map((option) => (
            <Button
              key={option.value}
              type="button"
              variant={value === option.value ? "primary" : "outline-secondary"}
              aria-pressed={value === option.value}
              disabled={disabled}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <Form.Text muted>
        {selected.help}
        {!hasTrailerOptions
          ? value === ITEM_ASSOCIATION_TRAILER
            ? " Open the Trailer list to load choices. If none appear, no trailers are currently available."
            : " Select Trailer, then open the list to load available trailers."
          : ""}
      </Form.Text>
    </Form.Group>
  );
}
