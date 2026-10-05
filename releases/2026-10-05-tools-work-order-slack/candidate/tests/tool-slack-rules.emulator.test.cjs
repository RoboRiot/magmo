"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const ENABLED = process.env.MAGMO_TOOL_SLACK_EMULATOR_TEST === "1";
const PROJECT = "demo-magmo-archive", HOST = "127.0.0.1:8189";
test("tool Slack delivery receipts are server-only against exact scoped rules", {
  skip: !ENABLED && "Explicit isolated emulator opt-in required", timeout: 60000,
}, async (t) => {
  assert.equal(process.env.FIRESTORE_EMULATOR_HOST, HOST); assert.equal(process.env.GCLOUD_PROJECT, PROJECT);
  if (process.env.GOOGLE_CLOUD_PROJECT) assert.equal(process.env.GOOGLE_CLOUD_PROJECT, PROJECT);
  const { initializeApp, deleteApp } = require("firebase-admin/app");
  const { getFirestore } = require("firebase-admin/firestore");
  const firebase = require("firebase/compat/app"); require("firebase/compat/firestore");
  const { connectFirestoreEmulator, setLogLevel } = require("firebase/firestore"); setLogLevel("silent");
  const runId = `tool-rules-${Date.now()}-${process.pid}`;
  const app = initializeApp({ projectId: PROJECT }, `${runId}-admin-sdk`);
  const adminDb = getFirestore(app); adminDb.settings({ host: HOST, ssl: false });
  const clients = [];
  const client = (role, email) => {
    const user = firebase.initializeApp({ projectId: PROJECT, apiKey: "emulator-only", appId: runId }, `${runId}-${role}`);
    const db = user.firestore();
    connectFirestoreEmulator(db._delegate, "127.0.0.1", 8189, { mockUserToken: { sub: `${runId}-${role}`, role, email, email_verified: true } });
    clients.push({ user, db }); return db;
  };
  const employee = client("employee", "tools-test@advancedimagingparts.com");
  const admin = client("admin", "tools-admin@advancedimagingparts.com");
  const viewer = client("viewer", "tools-viewer@example.test");
  const path = `ToolSlackDeliveries/${runId}`;
  const denied = async (call) => assert.rejects(call, (error) => /permission-denied|PERMISSION_DENIED|^7$/.test(String(error.code)));
  try {
    await adminDb.doc(path).set({ toolId: "AIS_T00001", status: "sent", row: { rowId: "RecTest", listId: "FTest" } });
    for (const [name, db] of [["employee", employee], ["admin browser", admin], ["viewer", viewer]]) {
      await t.test(`${name} cannot read, create, update or delete global Slack dedupe receipts`, async () => {
        await denied(() => db.doc(path).get());
        await denied(() => db.doc(`${path}-forged`).set({ status: "failed" }));
        await denied(() => db.doc(path).update({ status: "failed" }));
        await denied(() => db.doc(path).delete());
        await denied(() => db.doc(`${path}/nested/forged`).set({ status: "failed" }));
      });
    }
    await t.test("ordinary internal tool access remains allowed", async () => {
      const ref = employee.collection("Tool").doc(`${runId}-tool`);
      await ref.set({ name: "Emulator tool", description: "unchanged tool access" });
      assert.equal((await ref.get()).data().name, "Emulator tool");
      await ref.update({ description: "updated" });
      assert.equal((await adminDb.doc(ref.path).get()).data().description, "updated");
    });
    await t.test("Admin SDK can maintain protected receipt checkpoints", async () => {
      await adminDb.doc(path).update({ status: "existing" });
      assert.equal((await adminDb.doc(path).get()).data().status, "existing");
    });
  } finally {
    for (const { user, db } of clients) { await db.terminate(); await user.delete(); }
    await adminDb.terminate(); await deleteApp(app);
  }
});
