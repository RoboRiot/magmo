const {
  renderStorageUnitLabelSymbols,
} = require("../../../lib/inventory/storageUnitLabel.cjs");

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  const { requireFirebaseAuth } = await import("../../../utils/apiAuth");
  await requireFirebaseAuth(req, res);
  if (res.writableEnded) return;

  const rawUnitId = Array.isArray(req.query?.unitId)
    ? req.query.unitId[0]
    : req.query?.unitId;
  try {
    const rendered = renderStorageUnitLabelSymbols(rawUnitId);
    res.setHeader("Cache-Control", "private, no-store");
    return res.status(200).json({
      ok: true,
      unitId: rendered.payload.unit_id,
      unitType: rendered.payload.storage_unit_type,
      displayNumber: rendered.payload.display_number,
      qrValue: rendered.payload.qr_value,
      barcodeValue: rendered.payload.barcode_value,
      barcodeFormat: rendered.payload.barcode_format,
      qrSvg: rendered.qrSvg,
      barcodeSvg: rendered.barcodeSvg,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error:
        error?.message ||
        "unitId must be a positive bin or pallet ID such as B47 or P65.",
    });
  }
}
