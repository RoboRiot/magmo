"use strict";
// Keep the established npm vision:index entry point on the safe, planned repair.
require("./repair-item-vision-index.cjs").run().catch((error) => {
  console.error({ code: error.code, message: error.message });
  process.exitCode = 1;
});
