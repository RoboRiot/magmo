import React from "react";
import { TRAILER_YARD_WAREHOUSE } from "../utils/trailerYardLayout";

export default function TrailerYardWarehouse({
  classes,
  scale = 1,
  anchor = "center",
}) {
  const width = TRAILER_YARD_WAREHOUSE.width * scale;
  const height = TRAILER_YARD_WAREHOUSE.height * scale;
  const left =
    anchor.includes("left")
      ? TRAILER_YARD_WAREHOUSE.left
      : TRAILER_YARD_WAREHOUSE.left +
        (TRAILER_YARD_WAREHOUSE.width - width) / 2;
  const top =
    anchor.includes("bottom")
      ? TRAILER_YARD_WAREHOUSE.top + TRAILER_YARD_WAREHOUSE.height - height
      : TRAILER_YARD_WAREHOUSE.top +
        (TRAILER_YARD_WAREHOUSE.height - height) / 2;

  return (
    <div
      className={classes.warehouseComplex}
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: `${width}%`,
        height: `${height}%`,
      }}
      aria-hidden="true"
    >
      <div className={classes.warehouseBody} />
      <div className={`${classes.topDockDoor} ${classes.topDockDoorLeft}`} />
      <div className={`${classes.topDockDoor} ${classes.topDockDoorRight}`} />
      <div className={`${classes.dockDoor} ${classes.dockDoorNorth}`} />
      <div className={`${classes.dockDoor} ${classes.dockDoorSouth}`} />
    </div>
  );
}
