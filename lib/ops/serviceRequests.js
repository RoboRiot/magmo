import { FieldValue } from "firebase-admin/firestore";
import { adminBucket, adminDb } from "../../context/FirebaseAdmin";
import {
  createBlueFolderClient,
  extractWorkOrderFields,
  getBlueFolderSlackSettings,
} from "../bluefolder/client";
import { getSlackSettings } from "../slack/client";
import { postWorkOrderToSlack } from "../slack/postWorkOrder";
import { ingestCreatedWorkOrder } from "./ingestCreatedWorkOrder";
import { listOpsAssigneeOptions } from "./workOrders";

const COLLECTION = "ServiceRequests";
const ACTIVE_REQUEST_STATUSES = new Set([
  "pending",
  "accepting",
  "accepted_pending_sync",
]);
const URGENCY_LABELS = {
  hard_down: "Hard down",
  asap: "ASAP",
  soon: "Soon",
  anytime: "Anytime",
};

function requireServices() {
  if (!adminDb || !adminBucket) {
    throw new Error("Firebase Admin services are not initialized.");
  }
  return { db: adminDb, bucket: adminBucket };
}

function clean(value, maxLength = 500) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function timestampToIso(value) {
  if (!value) return "";
  if (typeof value.toDate === "function") return value.toDate().toISOString();
  if (typeof value === "string") return value;
  return "";
}

function normalizeName(value) {
  return clean(value, 200)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function scalar(value) {
  if (Array.isArray(value)) return scalar(value[0]);
  if (value && typeof value === "object") {
    return clean(value.text ?? value._ ?? "", 500);
  }
  return clean(value, 500);
}

function locationText(value) {
  if (!value) return "";
  if (typeof value === "string") return clean(value, 500);
  if (Array.isArray(value)) {
    return value.map(locationText).filter(Boolean).join(", ").slice(0, 500);
  }
  if (typeof value === "object") {
    return Object.values(value)
      .map(locationText)
      .filter(Boolean)
      .join(", ")
      .slice(0, 500);
  }
  return clean(value, 500);
}

function serializeClient(snapshot) {
  const data = snapshot.data() || {};
  return {
    id: snapshot.id,
    name: clean(data.name || data.clientName || data.companyName, 220),
    location: locationText(data.location || data.address),
    bluefolderCustomerId: clean(
      data.bluefolderCustomerId || data.blueFolderCustomerId,
      80
    ),
  };
}

function serializeRequest(snapshot, includeFiles = false) {
  const data = snapshot.data() || {};
  const result = {
    id: snapshot.id,
    requestNumber: clean(data.requestNumber || snapshot.id, 80),
    status: clean(data.status || "pending", 40),
    companyName: clean(data.companyName, 220),
    requestedServiceDate: clean(data.requestedServiceDate, 20),
    locationText: clean(data.locationText, 800),
    streetAddress: clean(data.streetAddress, 160),
    addressLine2: clean(data.addressLine2, 120),
    city: clean(data.city, 80),
    region: clean(data.region, 80),
    postalCode: clean(data.postalCode, 20),
    country: clean(data.country, 80),
    urgency: clean(data.urgency, 40),
    urgencyLabel: URGENCY_LABELS[data.urgency] || clean(data.urgency, 40),
    manufacturer: clean(data.manufacturer, 100),
    modality: clean(data.modality, 100),
    systemModel: clean(data.systemModel, 160),
    equipmentOperational: clean(data.equipmentOperational, 60),
    operationalImpact: clean(data.operationalImpact, 80),
    remoteAccess: clean(data.remoteAccess, 60),
    requestedTiming: clean(data.requestedTiming, 240),
    firstName: clean(data.firstName, 60),
    lastName: clean(data.lastName, 60),
    contactName: clean(
      data.contactName || `${data.firstName || ""} ${data.lastName || ""}`,
      140
    ),
    phone: clean(data.phone, 40),
    email: clean(data.email, 160),
    purchaseOrderNumber: clean(data.purchaseOrderNumber, 60),
    issueTitle: clean(data.issueTitle, 120),
    description: clean(data.description, 5000),
    clientMatchStatus: clean(data.clientMatchStatus || "pending", 40),
    suggestedClient:
      data.suggestedClient && typeof data.suggestedClient === "object"
        ? data.suggestedClient
        : null,
    confirmedClient:
      data.confirmedClient && typeof data.confirmedClient === "object"
        ? data.confirmedClient
        : null,
    blueFolder:
      data.blueFolder && typeof data.blueFolder === "object"
        ? data.blueFolder
        : null,
    magmo: data.magmo && typeof data.magmo === "object" ? data.magmo : null,
    processing:
      data.processing && typeof data.processing === "object"
        ? data.processing
        : null,
    fileCount: Array.isArray(data.files) ? data.files.length : 0,
    createdAt: timestampToIso(data.createdAt),
    updatedAt: timestampToIso(data.updatedAt),
    acceptedAt: timestampToIso(data.acceptedAt),
    archivedAt: timestampToIso(data.archivedAt),
  };
  if (includeFiles) {
    result.files = (Array.isArray(data.files) ? data.files : []).map(
      (file, index) => ({
        index,
        name: clean(file?.name, 140),
        contentType: clean(file?.contentType, 100),
        size: Number(file?.size || 0),
        storagePath: clean(file?.storagePath, 500),
        blueFolderAttachmentId: clean(file?.blueFolderAttachmentId, 200),
      })
    );
  }
  return result;
}

export async function listServiceRequests({ archived = false } = {}) {
  const { db } = requireServices();
  const [requestSnapshot, clientSnapshot] = await Promise.all([
    db.collection(COLLECTION).limit(400).get(),
    db.collection("Client").limit(500).get(),
  ]);
  const requests = requestSnapshot.docs
    .map((snapshot) => serializeRequest(snapshot))
    .filter((request) =>
      archived
        ? request.status === "archived"
        : ACTIVE_REQUEST_STATUSES.has(request.status)
    )
    .sort((left, right) => Date.parse(right.createdAt || 0) - Date.parse(left.createdAt || 0));
  const clients = clientSnapshot.docs
    .map(serializeClient)
    .filter((client) => client.name)
    .sort((left, right) => left.name.localeCompare(right.name));
  return {
    requests,
    clients,
    assigneeOptions: listOpsAssigneeOptions(),
  };
}

export async function getServiceRequestDetail(requestId) {
  const { db, bucket } = requireServices();
  const snapshot = await db.collection(COLLECTION).doc(clean(requestId, 180)).get();
  if (!snapshot.exists) throw new Error("Service request does not exist.");
  const request = serializeRequest(snapshot, true);
  request.files = await Promise.all(
    request.files.map(async (file) => {
      if (!file.storagePath) return file;
      const [url] = await bucket.file(file.storagePath).getSignedUrl({
        action: "read",
        expires: Date.now() + 15 * 60_000,
      });
      return { ...file, url };
    })
  );
  return request;
}

async function getClient(clientId) {
  const { db } = requireServices();
  const snapshot = await db.collection("Client").doc(clean(clientId, 180)).get();
  if (!snapshot.exists) throw new Error("Select a valid client from the Client DB.");
  const client = serializeClient(snapshot);
  if (!client.name) throw new Error("The selected Client DB record has no name.");
  return client;
}

export async function confirmServiceRequestClient({
  requestId,
  clientId,
  changedBy,
}) {
  const { db } = requireServices();
  const client = await getClient(clientId);
  await db
    .collection(COLLECTION)
    .doc(clean(requestId, 180))
    .set(
      {
        confirmedClient: {
          id: client.id,
          name: client.name,
          location: client.location,
          confirmedBy: clean(changedBy, 180),
          confirmedAtIso: new Date().toISOString(),
        },
        clientMatchStatus: "confirmed",
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  return client;
}

export async function archiveServiceRequest({ requestId, changedBy }) {
  const { db } = requireServices();
  const ref = db.collection(COLLECTION).doc(clean(requestId, 180));
  const snapshot = await ref.get();
  if (!snapshot.exists) throw new Error("Service request does not exist.");
  if (snapshot.data()?.status === "denied") {
    throw new Error("A denied request cannot be archived.");
  }
  await ref.set(
    {
      status: "archived",
      archivedAt: FieldValue.serverTimestamp(),
      archivedBy: clean(changedBy, 180),
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
  return { requestId: ref.id };
}

export async function denyServiceRequest({ requestId, changedBy }) {
  const { db, bucket } = requireServices();
  const ref = db.collection(COLLECTION).doc(clean(requestId, 180));
  const snapshot = await ref.get();
  if (!snapshot.exists) throw new Error("Service request does not exist.");
  const data = snapshot.data() || {};
  if (data.status === "accepted" || data.blueFolder?.serviceRequestId) {
    throw new Error("This request already created a work order and cannot be denied.");
  }
  const paths = (Array.isArray(data.files) ? data.files : [])
    .map((file) => clean(file?.storagePath, 500))
    .filter(Boolean);
  await Promise.all(
    paths.map((path) => bucket.file(path).delete({ ignoreNotFound: true }))
  );
  await ref.set(
    {
      status: "denied",
      files: [],
      deniedAt: FieldValue.serverTimestamp(),
      deniedBy: clean(changedBy, 180),
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
  return { requestId: ref.id, deletedAttachmentCount: paths.length };
}

function detailedDescription(request, client) {
  const lines = [
    `AIS Website Service Request: ${request.requestNumber}`,
    `Confirmed Magmo client: ${client.name} (${client.id})`,
    `Submitted company: ${request.companyName}`,
    `Equipment location: ${request.locationText}`,
    `Requested service date: ${request.requestedServiceDate}`,
    `Urgency: ${request.urgencyLabel}`,
    "",
    `Equipment: ${request.manufacturer} ${request.modality}${
      request.systemModel ? ` — ${request.systemModel}` : ""
    }`,
    `Operational: ${request.equipmentOperational}`,
    `Operational impact: ${request.operationalImpact}`,
    `Remote access: ${request.remoteAccess}`,
    request.requestedTiming
      ? `Requested timing / access notes: ${request.requestedTiming}`
      : "",
    "",
    `Contact: ${request.contactName}`,
    `Phone: ${request.phone}`,
    `Email: ${request.email}`,
    request.purchaseOrderNumber
      ? `Purchase order: ${request.purchaseOrderNumber}`
      : "",
    "",
    `Issue: ${request.issueTitle}`,
    request.description,
  ];
  return lines.filter((line, index) => line || lines[index - 1] !== "").join("\n");
}

function blueFolderUserName(user) {
  return (
    scalar(user.fullName) ||
    scalar(user.displayName) ||
    [scalar(user.firstName), scalar(user.lastName)].filter(Boolean).join(" ") ||
    scalar(user.userName)
  );
}

async function acquireAcceptance(ref, acceptedBy) {
  const { db } = requireServices();
  return db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    if (!snapshot.exists) throw new Error("Service request does not exist.");
    const data = snapshot.data() || {};
    if (data.status === "accepted") return { alreadyAccepted: true, data };
    if (["archived", "denied"].includes(data.status)) {
      throw new Error(`A ${data.status} request cannot be accepted.`);
    }
    const startedAtMs = Number(data.processing?.acceptStartedAtMs || 0);
    if (data.status === "accepting" && Date.now() - startedAtMs < 120_000) {
      throw new Error("This request is already being accepted. Refresh in a moment.");
    }
    transaction.set(
      ref,
      {
        status: "accepting",
        processing: {
          stage: "bluefolder",
          acceptStartedAtMs: Date.now(),
          acceptedBy: clean(acceptedBy, 180),
          error: "",
        },
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    return { alreadyAccepted: false, data };
  });
}

export async function acceptServiceRequest({
  requestId,
  clientId,
  assigneeIds = [],
  acceptedBy,
}) {
  const { db, bucket } = requireServices();
  const ref = db.collection(COLLECTION).doc(clean(requestId, 180));
  const lock = await acquireAcceptance(ref, acceptedBy);
  if (lock.alreadyAccepted) {
    return serializeRequest(await ref.get(), true);
  }

  try {
    let snapshot = await ref.get();
    let data = snapshot.data() || {};
    const request = serializeRequest(snapshot, true);
    const selectedClientId = clean(clientId || request.confirmedClient?.id, 180);
    if (!selectedClientId) {
      throw new Error("Confirm the matching Client DB record before accepting.");
    }
    const client = await getClient(selectedClientId);
    await confirmServiceRequestClient({
      requestId: ref.id,
      clientId: client.id,
      changedBy: acceptedBy,
    });

    const options = listOpsAssigneeOptions();
    const allowedIds = new Set(options.map((option) => option.id));
    const selectedIds = Array.from(
      new Set(
        (Array.isArray(assigneeIds) ? assigneeIds : [])
          .map((value) => clean(value, 80))
          .filter((value) => allowedIds.has(value))
      )
    );
    const selectedAssignees = options.filter((option) =>
      selectedIds.includes(option.id)
    );
    const blueFolder = createBlueFolderClient(getBlueFolderSlackSettings());
    const externalId = `AIS-WEB-${ref.id}`;
    let blueFolderState =
      data.blueFolder && typeof data.blueFolder === "object"
        ? { ...data.blueFolder }
        : {};
    let serviceRequestId = clean(blueFolderState.serviceRequestId, 80);
    let workOrderNumber = clean(blueFolderState.number, 80);

    if (!serviceRequestId) {
      const recovered = await blueFolder
        .getWorkOrderByExternalId(externalId)
        .catch(() => null);
      if (recovered) {
        serviceRequestId = scalar(
          recovered.serviceRequestId || recovered.serviceRequestID
        );
        workOrderNumber = scalar(
          recovered.serviceRequestNo ||
            recovered.serviceRequestNumber ||
            serviceRequestId
        );
      }
    }

    if (!serviceRequestId) {
      let blueFolderCustomerId = client.bluefolderCustomerId;
      if (!blueFolderCustomerId) {
        const customers = await blueFolder.listCustomers();
        const match = customers.find(
          (customer) =>
            normalizeName(scalar(customer.customerName || customer.name)) ===
            normalizeName(client.name)
        );
        blueFolderCustomerId = scalar(match?.customerId || match?.id);
      }
      const created = await blueFolder.createServiceRequest({
        customerId: blueFolderCustomerId,
        description: request.issueTitle,
        detailedDescription: detailedDescription(request, client),
        externalId,
        priority: request.urgencyLabel,
        purchaseOrderNo: request.purchaseOrderNumber,
        sourceId: request.requestNumber,
      });
      serviceRequestId = created.serviceRequestId;
      workOrderNumber = serviceRequestId;
      const detail = await blueFolder.getWorkOrder(serviceRequestId).catch(() => null);
      if (detail) {
        const fields = extractWorkOrderFields(
          detail,
          getBlueFolderSlackSettings()
        );
        workOrderNumber = fields.number || serviceRequestId;
      }
      blueFolderState = {
        ...blueFolderState,
        serviceRequestId,
        number: workOrderNumber,
        externalId,
        customerId: blueFolderCustomerId || null,
        createdAtIso: new Date().toISOString(),
      };
      await ref.set(
        {
          blueFolder: blueFolderState,
          processing: {
            ...data.processing,
            stage: "assignment",
            acceptStartedAtMs: Date.now(),
            acceptedBy: clean(acceptedBy, 180),
            error: "",
          },
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    }

    let blueFolderAssignees = Array.isArray(blueFolderState.assignees)
      ? blueFolderState.assignees
      : [];
    if (selectedAssignees.length && !blueFolderState.assignmentCompleted) {
      const users = await blueFolder.listUsers();
      const usersByName = new Map(
        users
          .map((user) => [
            normalizeName(blueFolderUserName(user)),
            {
              id: scalar(user.userId || user.id),
              name: blueFolderUserName(user),
            },
          ])
          .filter(([name, user]) => name && user.id)
      );
      blueFolderAssignees = selectedAssignees
        .map((assignee) => usersByName.get(normalizeName(assignee.name)))
        .filter(Boolean);
      if (blueFolderAssignees.length) {
        await blueFolder.addAssignment(
          serviceRequestId,
          blueFolderAssignees.map((assignee) => assignee.id),
          `Assigned while accepting ${request.requestNumber} in Magmo Ops`
        );
      }
      blueFolderState = {
        ...blueFolderState,
        assignmentCompleted: true,
        assignees: blueFolderAssignees,
        unmappedAssigneeNames: selectedAssignees
          .filter(
            (selected) =>
              !blueFolderAssignees.some(
                (mapped) =>
                  normalizeName(mapped.name) === normalizeName(selected.name)
              )
          )
          .map((assignee) => assignee.name),
      };
      await ref.set(
        {
          blueFolder: blueFolderState,
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    }

    snapshot = await ref.get();
    data = snapshot.data() || {};
    const files = Array.isArray(data.files) ? [...data.files] : [];
    for (let index = 0; index < files.length; index += 1) {
      const file = files[index] || {};
      if (file.blueFolderAttachmentId || !file.storagePath) continue;
      const [content] = await bucket.file(file.storagePath).download();
      const uploaded = await blueFolder.addAttachment({
        serviceRequestId,
        content,
        fileName: clean(file.name, 140),
        contentType: clean(file.contentType, 100),
      });
      files[index] = {
        ...file,
        blueFolderAttachmentId: uploaded.attachmentToken,
      };
      await ref.set(
        {
          files,
          processing: {
            ...data.processing,
            stage: "slack",
            acceptStartedAtMs: Date.now(),
            acceptedBy: clean(acceptedBy, 180),
            error: "",
          },
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    }

    let slackState =
      data.blueFolder?.slack && typeof data.blueFolder.slack === "object"
        ? data.blueFolder.slack
        : blueFolderState.slack || {};
    if (!slackState.permalink) {
      const testingChannelId = clean(
        process.env.OPS_TESTING_CHANNEL_ID ||
          process.env.SLACK_TESTING_CHANNEL_ID,
        120
      );
      if (!testingChannelId) {
        throw new Error(
          "OPS_TESTING_CHANNEL_ID is required; this intake will not post to the production dispatch channel."
        );
      }
      const baseSlackSettings = getSlackSettings();
      const slackSettings = {
        ...baseSlackSettings,
        slackChannelId: testingChannelId,
        slackChannelName: "",
        slackUserIds: Array.from(
          new Set([...baseSlackSettings.slackUserIds, ...selectedIds])
        ),
      };
      slackState = await postWorkOrderToSlack({
        settings: slackSettings,
        subject: request.issueTitle,
        bluefolderUrl: getBlueFolderSlackSettings()
          .bluefolderWorkOrderUrlTemplate.replaceAll(
            "{id}",
            encodeURIComponent(serviceRequestId)
          )
          .replaceAll("{number}", encodeURIComponent(workOrderNumber)),
        workOrderNumber,
      });
      blueFolderState = { ...blueFolderState, slack: slackState };
      await ref.set(
        {
          blueFolder: blueFolderState,
          processing: {
            ...data.processing,
            stage: "magmo",
            acceptStartedAtMs: Date.now(),
            acceptedBy: clean(acceptedBy, 180),
            error: "",
          },
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
      if (slackState.permalink) {
        await blueFolder
          .updateSlackLink(serviceRequestId, slackState.permalink)
          .catch((error) => {
            console.warn("[Ops][service-request][bluefolder-link]", error?.message);
          });
      }
    }

    const bluefolderUrl = getBlueFolderSlackSettings()
      .bluefolderWorkOrderUrlTemplate.replaceAll(
        "{id}",
        encodeURIComponent(serviceRequestId)
      )
      .replaceAll("{number}", encodeURIComponent(workOrderNumber));
    const { workOrder, priorityAnalyzed } = await ingestCreatedWorkOrder({
      eventType: "work_order.created",
      workOrderId: serviceRequestId,
      number: workOrderNumber,
      subject: request.issueTitle,
      description: detailedDescription(request, client),
      customer: client.name,
      bluefolderUrl,
      slackPermalink: slackState.permalink,
      slackChannel: slackState.channel,
      slackThreadTs: slackState.ts,
      createdAt: new Date().toISOString(),
      intakeServiceRequestId: ref.id,
      clientId: client.id,
      clientName: client.name,
      assignees: selectedAssignees,
      bluefolderAssignees,
    });

    await ref.set(
      {
        status: "accepted",
        confirmedClient: {
          id: client.id,
          name: client.name,
          location: client.location,
          confirmedBy: clean(acceptedBy, 180),
          confirmedAtIso: new Date().toISOString(),
        },
        blueFolder: { ...blueFolderState, serviceRequestId, number: workOrderNumber },
        magmo: {
          workOrderId: workOrder.id,
          workflowStatus: workOrder.workflowStatus,
          priorityAnalyzed,
          syncedAtIso: new Date().toISOString(),
        },
        processing: null,
        acceptedAt: FieldValue.serverTimestamp(),
        acceptedBy: clean(acceptedBy, 180),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    return serializeRequest(await ref.get(), true);
  } catch (error) {
    const current = await ref.get();
    const data = current.data() || {};
    const hasBlueFolderWorkOrder = Boolean(data.blueFolder?.serviceRequestId);
    await ref.set(
      {
        status: hasBlueFolderWorkOrder ? "accepted_pending_sync" : "pending",
        processing: {
          ...(data.processing || {}),
          stage: hasBlueFolderWorkOrder ? "retry_sync" : "retry_bluefolder",
          error: clean(error?.message || error, 800),
          failedAtIso: new Date().toISOString(),
          acceptStartedAtMs: 0,
          acceptedBy: clean(acceptedBy, 180),
        },
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    throw error;
  }
}
