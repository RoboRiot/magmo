"use strict";
const { validateEquipmentIdentity } = require("./blueFolderImportContract.cjs");
const schemas = require("./equipment-schema.json");
function extendContract(base) {
  const classifyOpsError = (error) => ["work_order_deleted", "work_order_not_found"].includes(error?.code)
    ? new base.OpsHttpError(error.code === "work_order_deleted" ? 409 : 404, error.code, String(error.message || "The work order is unavailable."), { retryable: false })
    : base.classifyOpsError(error);
  return {
    ...base,
    classifyOpsError,
    errorResponse(error, requestId) { return base.errorResponse(classifyOpsError(error), requestId); },
    runtimeCapabilities(env) { return { ...base.runtimeCapabilities(env), bluefolderEquipmentLink: schemas.capability }; },
    validateIngestRequest(body) {
      const result = base.validateIngestRequest(body);
      if (body.eventType === "work_order.imported") {
        try {
          if (Object.prototype.hasOwnProperty.call(body, "existingOnly") && typeof body.existingOnly !== "boolean") {
            throw Object.assign(new Error("existingOnly must be a boolean."), { code: "bluefolder_import_existing_only_invalid" });
          }
          validateEquipmentIdentity(body.blueFolder);
        }
        catch (error) { throw new base.OpsHttpError(400, error.code, error.message); }
      }
      return result;
    },
    buildOpenApiSpec() {
      const spec = base.buildOpenApiSpec();
      Object.assign(spec.components.schemas.WorkOrderImportedRequest.properties.blueFolder.properties, schemas.equipment);
      spec.components.schemas.WorkOrderImportedRequest.properties.existingOnly = schemas.existingOnly;
      spec["x-magmo-capabilities"].bluefolderEquipmentLink = schemas.capability;
      return spec;
    },
  };
}
module.exports = { extendContract };
