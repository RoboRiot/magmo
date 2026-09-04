const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const babel = require("@babel/core");

const projectRoot = path.join(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(projectRoot, relativePath), "utf8");
}

test("pallet preview mirrors the server's fifteen-bin landscape pages", () => {
  const filename = path.join(
    projectRoot,
    "pages",
    "NewSearch",
    "inventory",
    "storage",
    "[id].js"
  );
  const source = fs.readFileSync(filename, "utf8");
  babel.transformSync(source, {
    babelrc: false,
    configFile: false,
    filename,
    presets: ["next/babel"],
  });
  const serverSource = read(
    "scanner-server/warehouse_scanner/storage_label_print.py"
  );

  const browserCapacity = Number(
    source.match(/PALLET_LABEL_BINS_PER_PAGE\s*=\s*(\d+)/)?.[1]
  );
  const serverCapacity = Number(
    serverSource.match(/MAX_PALLET_BINS_PER_PAGE\s*=\s*(\d+)/)?.[1]
  );
  assert.equal(browserCapacity, 15);
  assert.equal(serverCapacity, browserCapacity);
  assert.match(source, /styles\.storageLabelSheetPallet/);
  assert.match(source, /styles\.labelPreviewModalPallet/);
  assert.match(
    source,
    /labelPreview\.unitType === "pallet" \? "6in 4in" : "4in 6in"/
  );
  assert.match(source, /bin\.barcodeSvg/);
  assert.match(source, /Code 128 barcode containing \$\{bin\.serial_id\}/);
});

test("print CSS keeps bins portrait and makes only pallets landscape", () => {
  const css = read("styles/StorageUnitDetail.module.css");

  assert.match(
    css,
    /\.storageLabelSheetBin\s*\{[^}]*width:\s*4in;[^}]*aspect-ratio:\s*2\s*\/\s*3;/s
  );
  assert.match(
    css,
    /\.storageLabelSheetPallet\s*\{[^}]*width:\s*6in;[^}]*aspect-ratio:\s*3\s*\/\s*2;/s
  );
  assert.match(css, /@page\s+palletStorageLabel\s*\{[^}]*size:\s*6in\s+4in;/s);
  assert.match(css, /@page\s+binStorageLabel\s*\{[^}]*size:\s*4in\s+6in;/s);
  assert.match(css, /\.storageLabelPalletBinBarcode\s+svg/);
});
