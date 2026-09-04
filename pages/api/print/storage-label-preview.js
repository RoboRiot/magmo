const {
  renderStorageUnitLabelSymbols,
} = require("../../../lib/inventory/storageUnitLabel.cjs");
const {
  loadStorageUnitLabelPayload,
} = require("../../../lib/inventory/storageUnitLabelData.cjs");

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "private, no-store");
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  const { requireFirebaseAuth } = await import("../../../utils/apiAuth");
  const { adminDb } = await import("../../../context/FirebaseAdmin");
  await requireFirebaseAuth(req, res);
  if (res.writableEnded) return;
  if (!adminDb) {
    return res.status(503).json({
      ok: false,
      error: "The inventory database is unavailable.",
    });
  }

  const rawUnitId = Array.isArray(req.query?.unitId)
    ? req.query.unitId[0]
    : req.query?.unitId;
  try {
    const payload = await loadStorageUnitLabelPayload({
      db: adminDb,
      unitId: rawUnitId,
      publicOrigin: process.env.MAGMO_PUBLIC_ORIGIN || "https://magmo.cloud",
    });
    const rendered = renderStorageUnitLabelSymbols(payload);
    const itemBarcodeById = new Map(
      rendered.itemBarcodeSvgs.map((entry) => [entry.itemId, entry.svg])
    );
    return res.status(200).json({
      ok: true,
      unitId: rendered.payload.unit_id,
      unitType: rendered.payload.storage_unit_type,
      displayNumber: rendered.payload.display_number,
      serialId: rendered.payload.serial_id,
      qrValue: rendered.payload.qr_value,
      barcodeValue: rendered.payload.barcode_value,
      barcodeFormat: rendered.payload.barcode_format,
      qrSvg: rendered.qrSvg,
      barcodeSvg: rendered.barcodeSvg,
      items: (rendered.payload.items || []).map((item) => ({
        ...item,
        barcodeSvg: itemBarcodeById.get(item.item_id) || "",
      })),
      bins: rendered.payload.bins || [],
    });
  } catch (error) {
    const status = Number(error?.statusCode) || 400;
    if (status >= 500) console.error("[StorageLabel][preview]", error);
    return res.status(status).json({
      ok: false,
      code: error?.code || "invalid_storage_unit_id",
      error:
        status >= 500
          ? "The storage label preview could not be loaded."
          : error?.message ||
            "unitId must be a positive bin or pallet ID such as B47 or P65.",
    });
  }
}
