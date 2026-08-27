import { FieldValue } from "firebase-admin/firestore";
import { BlueFolderClient } from "../bluefolder/client";

const {
  clientAddressPatch,
  normalizeBlueFolderCustomer,
  planBlueFolderLocationMatches,
  resolveClientAddress,
} = require("./clientDirectory.cjs");

export const OPS_CLIENT_DIRECTORY_METADATA_COLLECTION = "OpsDirectoryMetadata";
export const OPS_CLIENT_DIRECTORY_METADATA_DOCUMENT = "bluefolder-clients";
const CLIENT_COLLECTION = "Client";

function integerInRange(value, fallback, minimum, maximum) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(minimum, Math.min(maximum, Math.floor(parsed)));
}

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function retryableBlueFolderReadError(error) {
  const message = String(error?.message || error || "");
  const status = Number(message.match(/returned\s+(\d{3})/i)?.[1] || 0);
  return (
    status === 429 ||
    status >= 500 ||
    /abort|econnreset|etimedout|fetch failed|network/i.test(message)
  );
}

function createReadRequestController({ spacingMs = 750, maxAttempts = 3 } = {}) {
  const metrics = { attempted: 0, succeeded: 0, failed: 0, retries: 0 };
  let nextStartAt = 0;
  let gate = Promise.resolve();
  async function pace() {
    const turn = gate.then(async () => {
      const delay = Math.max(0, nextStartAt - Date.now());
      if (delay) await wait(delay);
      nextStartAt = Date.now() + integerInRange(spacingMs, 750, 100, 5000);
    });
    gate = turn.catch(() => {});
    await turn;
  }
  async function read(callback) {
    const attempts = integerInRange(maxAttempts, 3, 1, 5);
    for (let attempt = 1; attempt <= attempts; attempt += 1) {
      await pace();
      metrics.attempted += 1;
      try {
        const result = await callback();
        metrics.succeeded += 1;
        return result;
      } catch (error) {
        if (attempt >= attempts || !retryableBlueFolderReadError(error)) {
          metrics.failed += 1;
          throw error;
        }
        metrics.retries += 1;
        await wait(Math.min(4000, 500 * 2 ** (attempt - 1)));
      }
    }
    throw new Error("BlueFolder read retry loop ended unexpectedly.");
  }
  return { metrics, read };
}

async function mapConcurrent(items, limit, callback) {
  const results = new Array(items.length);
  let nextIndex = 0;
  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await callback(items[index], index);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(limit, Math.max(items.length, 1)) }, worker)
  );
  return results;
}

function hasUsableAddress(customer) {
  return Boolean(normalizeBlueFolderCustomer(customer).primaryLocation?.formattedAddress);
}

export async function loadDetailedBlueFolderCustomers(
  client = new BlueFolderClient(),
  {
    concurrency = 1,
    requireEveryCustomer = true,
    requestSpacingMs = 750,
    maxAttempts = 3,
  } = {}
) {
  const controller = createReadRequestController({
    spacingMs: requestSpacingMs,
    maxAttempts,
  });
  const summaries = await controller.read(() =>
    client.listCustomers({ listType: "full" })
  );
  const detailErrors = [];
  const customers = await mapConcurrent(
    summaries,
    integerInRange(concurrency, 1, 1, 4),
    async (summary) => {
      if (hasUsableAddress(summary)) return summary;
      const normalized = normalizeBlueFolderCustomer(summary);
      if (!normalized.bluefolderCustomerId) {
        detailErrors.push({
          customerId: "",
          name: normalized.name,
          error: "BlueFolder list record did not include a customer ID.",
        });
        return summary;
      }
      try {
        return (
          (await controller.read(() =>
            client.getCustomer(normalized.bluefolderCustomerId)
          )) || summary
        );
      } catch (error) {
        detailErrors.push({
          customerId: normalized.bluefolderCustomerId,
          name: normalized.name,
          error: String(error?.message || error),
        });
        return summary;
      }
    }
  );
  if (requireEveryCustomer && detailErrors.length) {
    const preview = detailErrors
      .slice(0, 3)
      .map((entry) => `${entry.customerId || entry.name}: ${entry.error}`)
      .join("; ");
    throw new Error(
      `BlueFolder customer detail sync failed for ${detailErrors.length} record(s): ${preview}`
    );
  }
  return {
    customers,
    detailErrors,
    apiCalls: {
      ...controller.metrics,
      plannedMaximum:
        1 +
        summaries.filter((summary) => !hasUsableAddress(summary)).length *
          integerInRange(maxAttempts, 3, 1, 5),
    },
  };
}

function publicMatch(match) {
  return {
    bluefolderCustomerId: match.bluefolder.bluefolderCustomerId,
    bluefolderName: match.bluefolder.name,
    magmoClientId: match.magmo.id,
    magmoClientName: match.magmo.name,
    matchReason: match.reason,
    bluefolderLocationId: match.location?.bluefolderLocationId || "",
    bluefolderLocationName: match.location?.name || "",
    address: match.location?.formattedAddress || "",
    locationCount: match.bluefolder.locations.length,
  };
}

async function commitWrites(db, writes, metadata) {
  const operations = [...writes, metadata];
  for (let index = 0; index < operations.length; index += 400) {
    const batch = db.batch();
    operations.slice(index, index + 400).forEach((operation) => {
      batch.set(operation.ref, operation.data, { merge: true });
    });
    await batch.commit();
  }
}

export async function syncBlueFolderClientAddresses(
  db,
  {
    client,
    dryRun = true,
    overwriteLocation = false,
    allowNameMatch = true,
    concurrency = 1,
    requestSpacingMs = 750,
    maxAttempts = 3,
    requireEveryCustomer = true,
  } = {}
) {
  if (!db) throw new Error("Magmo Firestore is required for the client address sync.");
  const blueFolderClient = client || new BlueFolderClient();
  const [{ customers, detailErrors, apiCalls }, clientSnapshot] = await Promise.all([
    loadDetailedBlueFolderCustomers(blueFolderClient, {
      concurrency,
      requestSpacingMs,
      maxAttempts,
      requireEveryCustomer,
    }),
    db.collection(CLIENT_COLLECTION).get(),
  ]);

  const magmoClients = clientSnapshot.docs.map((snapshot) => ({
    id: snapshot.id,
    data: snapshot.data() || {},
    ref: snapshot.ref,
  }));
  const magmoById = new Map(magmoClients.map((entry) => [entry.id, entry]));
  const plan = planBlueFolderLocationMatches(magmoClients, customers, {
    allowNameMatch,
  });
  const matches = plan.matches.map((entry) => ({
    ...entry,
    magmo: entry.match,
  }));
  const publicIssue = (entry) => ({
    bluefolderCustomerId: entry.bluefolder.bluefolderCustomerId,
    bluefolderName: entry.bluefolder.name,
    bluefolderLocationId: entry.location?.bluefolderLocationId || "",
    bluefolderLocationName: entry.location?.name || "",
    reason: entry.reason,
    candidates: (entry.ambiguous || []).map((candidate) => ({
      id: candidate.id,
      name: candidate.name,
    })),
  });
  const unmatched = plan.unmatched.map(publicIssue);
  const ambiguous = plan.ambiguous.map(publicIssue);
  const withoutAddress = plan.records
    .filter((entry) => !entry.location?.formattedAddress)
    .map((entry) => ({
      bluefolderCustomerId: entry.bluefolder.bluefolderCustomerId,
      bluefolderName: entry.bluefolder.name,
      bluefolderLocationId: entry.location?.bluefolderLocationId || "",
      bluefolderLocationName: entry.location?.name || "",
    }));

  const syncedAtIso = new Date().toISOString();
  if (!dryRun) {
    const writes = matches.map((match) => {
      const stored = magmoById.get(match.magmo.id);
      return {
        ref: stored.ref,
        data: {
          ...clientAddressPatch(match.rawCustomer, {
            location: match.location,
            current: stored.data,
            overwriteLocation,
          }),
          bluefolderAddressSyncedAt: FieldValue.serverTimestamp(),
          bluefolderAddressSyncedAtIso: syncedAtIso,
        },
      };
    });
    const metadata = {
      ref: db
        .collection(OPS_CLIENT_DIRECTORY_METADATA_COLLECTION)
        .doc(OPS_CLIENT_DIRECTORY_METADATA_DOCUMENT),
      data: {
        source: "bluefolder",
        bluefolderCustomerCount: customers.length,
        bluefolderLocationCount: plan.records.length,
        magmoClientCount: magmoClients.length,
        matchedCount: matches.length,
        unmatchedCount: unmatched.length,
        ambiguousCount: ambiguous.length,
        withoutAddressCount: withoutAddress.length,
        detailErrorCount: detailErrors.length,
        apiCalls,
        overwriteLocation: Boolean(overwriteLocation),
        lastSyncedAt: FieldValue.serverTimestamp(),
        lastSyncedAtIso: syncedAtIso,
      },
    };
    await commitWrites(db, writes, metadata);
  }

  return {
    dryRun: Boolean(dryRun),
    overwriteLocation: Boolean(overwriteLocation),
    bluefolderCustomerCount: customers.length,
    bluefolderLocationCount: plan.records.length,
    magmoClientCount: magmoClients.length,
    matchedCount: matches.length,
    unmatchedCount: unmatched.length,
    ambiguousCount: ambiguous.length,
    withoutAddressCount: withoutAddress.length,
    detailErrorCount: detailErrors.length,
    matches: matches.map(publicMatch),
    unmatched,
    ambiguous,
    withoutAddress,
    detailErrors,
    apiCalls,
    syncedAtIso,
  };
}

export { resolveClientAddress };
