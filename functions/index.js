const { onRequest } = require("firebase-functions/v2/https");
const next = require("next");
const admin = require("firebase-admin");

// Admin via ADC (Application Default Credentials)
if (!admin.apps.length) {
  admin.initializeApp();
}

const app = next({ dev: false, conf: { distDir: ".next" } });
const handle = app.getRequestHandler();
const prepared = app.prepare(); // start preparing once at cold start

exports.nextServer = onRequest(
  {
    region: "us-central1",
    memory: "1GiB",
    timeoutSeconds: 60,
  },
  async (req, res) => {
    try {
      await prepared; // ensure Next.js is ready
      return handle(req, res);
    } catch (error) {
      console.error("Error handling request:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);
