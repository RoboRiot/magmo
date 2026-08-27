"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const {
  highestDispatchWorkOrderNumber,
  nextDispatchWorkOrderNumber,
  parseDispatchWorkOrderRoot,
} = require("../lib/ops/workOrderNumbering.cjs");
const {
  dispatchRootUrl,
  generatedBlueFolderWorkOrderUrl,
  isMatchingGeneratedDispatchRoot,
  reserveDispatchWorkOrderNumber,
} = require("../lib/ops/dispatchWorkOrderNumber.cjs");
const {
  buildServiceRequestDispatchSubject,
} = require("../lib/ops/serviceRequestDispatchFormat.cjs");

function createTransactionalDb(initial = {}) {
  const documents = new Map(
    Object.entries(initial).map(([path, data]) => [path, structuredClone(data)])
  );
  let transactionQueue = Promise.resolve();

  const snapshotFor = (ref) => ({
    exists: documents.has(ref.path),
    data: () => structuredClone(documents.get(ref.path) || {}),
  });

  const db = {
    collection(collection) {
      return {
        doc(id) {
          return { path: `${collection}/${id}` };
        },
      };
    },
    runTransaction(callback) {
      const run = async () => {
        const writes = [];
        const transaction = {
          async get(ref) {
            return snapshotFor(ref);
          },
          set(ref, data, options = {}) {
            writes.push({ ref, data: structuredClone(data), options });
          },
        };
        const result = await callback(transaction);
        for (const write of writes) {
          const previous = write.options.merge
            ? documents.get(write.ref.path) || {}
            : {};
          documents.set(write.ref.path, {
            ...structuredClone(previous),
            ...structuredClone(write.data),
          });
        }
        return result;
      };
      const result = transactionQueue.then(run, run);
      transactionQueue = result.then(
        () => undefined,
        () => undefined
      );
      return result;
    },
    inspect(ref) {
      return structuredClone(documents.get(ref.path) || null);
    },
  };
  return db;
}

test("the newest numeric dispatch root advances by exactly one", () => {
  const messages = [
    { ts: "3.0", text: "#10428\nSimonmed Kyrene - remote access" },
    { ts: "2.0", text: "#10427\nPrevious request" },
  ];

  assert.equal(highestDispatchWorkOrderNumber(messages), 10428);
  assert.equal(nextDispatchWorkOrderNumber(messages), 10429);
});

test("generated work-order titles use the matching BlueFolder service-request URL", () => {
  assert.equal(
    generatedBlueFolderWorkOrderUrl("10434"),
    "https://advancedimaging.bluefolder.com/service/sr.aspx?srid=10434"
  );
  assert.throws(
    () => generatedBlueFolderWorkOrderUrl("OPS-20260819-430ELK"),
    /numeric work-order number/i
  );
});

test("an existing root is reusable only when its number, title, and srid URL match", () => {
  const root = {
    ts: "1787344750.841629",
    text:
      "#10455\n<https://advancedimaging.bluefolder.com/service/sr.aspx?srid=10455|Simonmed Northwest Trailer#14 - Lights are not responding>",
  };
  assert.equal(
    dispatchRootUrl(root),
    "https://advancedimaging.bluefolder.com/service/sr.aspx?srid=10455"
  );
  assert.equal(
    isMatchingGeneratedDispatchRoot(
      root,
      "10455",
      "Simonmed Northwest Trailer#14 - Lights are not responding"
    ),
    true
  );
  assert.equal(
    isMatchingGeneratedDispatchRoot(
      { ...root, text: root.text.replace("srid=10455", "srid=10454") },
      "10455",
      "Simonmed Northwest Trailer#14 - Lights are not responding"
    ),
    false
  );
});

test("website request titles inherit the confirmed Trailer 14 dispatch context", () => {
  assert.equal(
    buildServiceRequestDispatchSubject({
      issueTitle: "Lights are not responding",
      clientName: "Simonmed Imaging - Northwest NV",
      machineName: "Trailer AIS14 - HDxt 23x",
    }),
    "Simonmed Northwest Trailer#14 - Lights are not responding"
  );
});

test("generator titles that already contain site or trailer context stay unchanged", () => {
  assert.equal(
    buildServiceRequestDispatchSubject({
      issueTitle: "Simonmed Northwest Trailer#14 - multicoil Bias Fault",
      clientName: "Simonmed Imaging - Northwest NV",
      machineName: "Trailer AIS14 - HDxt 23x",
    }),
    "Simonmed Northwest Trailer#14 - multicoil Bias Fault"
  );
  assert.equal(
    buildServiceRequestDispatchSubject({
      issueTitle: "Prohealth West Hills MR1 - grainy images and L-spine scan failed",
      clientName: "Prohealth West Hills",
      machineName: "GE Signa HDxt 1.5T",
    }),
    "Prohealth West Hills MR1 - grainy images and L-spine scan failed"
  );
});

test("non-trailer website request titles inherit the confirmed client", () => {
  assert.equal(
    buildServiceRequestDispatchSubject({
      issueTitle: "Chiller low-flow error 04",
      clientName: "Prohealth Tarzana 2",
      machineName: "Siemens Biograph PET CT",
    }),
    "Prohealth Tarzana 2 - Chiller low-flow error 04"
  );
});

test("only exact numeric dispatch parent headings participate in numbering", () => {
  const rejected = [
    { ts: "1.0", text: "#OPS-20260819-430ELK\nGenerated request" },
    { ts: "2.0", text: "Update for #99999" },
    { ts: "3.0", text: "#10428abc\nNot a numeric work-order root" },
    { ts: "4.0", text: "Work order\n#99999" },
    { ts: "5.0", thread_ts: "4.0", text: "Reply mentioning #99999" },
  ];

  for (const message of rejected) {
    assert.equal(parseDispatchWorkOrderRoot(message), null);
  }
  assert.equal(nextDispatchWorkOrderNumber(rejected, { minimum: 10000 }), 10000);
});

test("normal Slack formatting does not hide a valid numeric parent", () => {
  assert.equal(
    parseDispatchWorkOrderRoot({ ts: "1.0", text: "  #10428  \nTitle" }),
    10428
  );
  assert.equal(
    parseDispatchWorkOrderRoot({ ts: "2.0", text: "*#10429*\nTitle" }),
    10429
  );
});

test("the reservation counter wins over stale Slack history", () => {
  const staleSlack = [{ ts: "1.0", text: "#10428\nExisting" }];

  assert.equal(
    nextDispatchWorkOrderNumber(staleSlack, { reservedThrough: 10429 }),
    10430
  );
});

test("safe integer validation prevents malformed headings from advancing the counter", () => {
  assert.equal(parseDispatchWorkOrderRoot({ text: "#0" }), null);
  assert.equal(parseDispatchWorkOrderRoot({ text: "#9007199254740992" }), null);
  assert.equal(parseDispatchWorkOrderRoot({ text: "**#10428**" }), null);
});

test("retrying the same request reuses its reserved numeric work-order number", async () => {
  const db = createTransactionalDb({ "ServiceRequests/request-a": {} });
  const requestRef = db.collection("ServiceRequests").doc("request-a");
  const slackMessages = [{ ts: "1.0", text: "#10428\nExisting work order" }];

  const first = await reserveDispatchWorkOrderNumber({
    db,
    requestRef,
    slackMessages,
    nowIso: "2026-08-19T12:00:00.000Z",
  });
  const retry = await reserveDispatchWorkOrderNumber({
    db,
    requestRef,
    slackMessages,
    nowIso: "2026-08-19T12:01:00.000Z",
  });

  assert.equal(first, "10429");
  assert.equal(retry, "10429");
  assert.equal(db.inspect(requestRef).allocatedWorkOrderNumber, "10429");
});

test("concurrent requests cannot reserve the same next dispatch number", async () => {
  const db = createTransactionalDb({
    "ServiceRequests/request-a": {},
    "ServiceRequests/request-b": {},
  });
  const requestA = db.collection("ServiceRequests").doc("request-a");
  const requestB = db.collection("ServiceRequests").doc("request-b");
  const slackMessages = [{ ts: "1.0", text: "#10428\nExisting work order" }];

  const numbers = await Promise.all(
    [requestA, requestB].map((requestRef) =>
      reserveDispatchWorkOrderNumber({
        db,
        requestRef,
        slackMessages,
        nowIso: "2026-08-19T12:00:00.000Z",
      })
    )
  );

  assert.deepEqual(numbers, ["10429", "10430"]);
  assert.equal(db.inspect(requestA).allocatedWorkOrderNumber, "10429");
  assert.equal(db.inspect(requestB).allocatedWorkOrderNumber, "10430");
});
