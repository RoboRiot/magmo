export function normalizeShippingGroupDocument(document) {
  const data = document?.data?.() || {};
  return {
    id: document?.id || "",
    name: String(data.name || "Shipping Group").trim(),
    type: data.type === "receiving" ? "receiving" : "shipping",
    itemIds: Array.isArray(data.itemIds)
      ? data.itemIds.map((itemId) => String(itemId || "").trim()).filter(Boolean)
      : [],
  };
}

export async function addItemToShippingGroup({
  db,
  firebase,
  groupId,
  itemId,
  previousItemId = "",
}) {
  const safeGroupId = String(groupId || "").trim();
  const safeItemId = String(itemId || "").trim();
  const safePreviousItemId = String(previousItemId || "").trim();
  if (!safeGroupId || !safeItemId) return;

  const groupRef = db.collection("shipping_groups").doc(safeGroupId);
  await db.runTransaction(async (transaction) => {
    const groupDoc = await transaction.get(groupRef);
    if (!groupDoc.exists) {
      throw new Error("The selected shipping group no longer exists.");
    }

    const group = normalizeShippingGroupDocument(groupDoc);
    if (group.type !== "shipping") {
      throw new Error("The selected group is not a shipping group.");
    }

    const nextItemIds = Array.from(
      new Set(
        group.itemIds
          .filter(
            (existingId) =>
              !safePreviousItemId ||
              safePreviousItemId === safeItemId ||
              existingId !== safePreviousItemId
          )
          .concat(safeItemId)
      )
    );

    transaction.update(groupRef, {
      itemIds: nextItemIds,
      itemCount: nextItemIds.length,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  });
}
