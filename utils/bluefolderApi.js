import { parseStringPromise } from "xml2js";

const API_BASE = "https://app.bluefolder.com/api/2.0";

export const BLUEFOLDER_ENDPOINTS = {
  itemAdd: `${API_BASE}/items/add.aspx`,
  serviceRequestGet: `${API_BASE}/serviceRequests/get.aspx`,
  serviceRequestAddMaterial: `${API_BASE}/serviceRequests/addMaterial.aspx`,
  usersList: `${API_BASE}/users/list.aspx`,
};

export function envValue(value) {
  return String(value || "").replace(/\s+#.*$/, "").trim();
}

export function getBlueFolderToken() {
  return envValue(
    process.env.BLUEFOLDER_API_TOKEN ||
      process.env.BLUEFOLDER_TOKEN ||
      process.env.BLUEFOLDER_ACCESS_TOKEN
  );
}

export function hasBlueFolderToken() {
  return Boolean(getBlueFolderToken());
}

export function normalizeWorkOrder(value) {
  return String(value || "").trim().replace(/^#/, "");
}

export function isClosedStatus(status, dateTimeClosed) {
  const normalized = String(status || "").trim().toLowerCase();
  return normalized === "closed" || String(dateTimeClosed || "").trim() !== "";
}

export function xmlEscape(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function asArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function getFirst(value) {
  if (Array.isArray(value)) return value[0];
  return value;
}

async function parseBlueFolderXml(raw) {
  try {
    return await parseStringPromise(raw, {
      explicitArray: false,
      trim: true,
    });
  } catch (error) {
    return {
      parseError: String(error?.message || error),
      raw,
    };
  }
}

function responseRoot(parsed) {
  return parsed?.response || {};
}

function responseStatus(parsed) {
  return String(responseRoot(parsed)?.$?.status || "").trim().toLowerCase();
}

function responseError(parsed) {
  const error = responseRoot(parsed)?.error;
  if (!error) return "";
  if (typeof error === "string") return error;
  return error?._ || error?.message || JSON.stringify(error);
}

function blueFolderHeaders(token) {
  return {
    Authorization: `Basic ${Buffer.from(`${token}:x`).toString("base64")}`,
    "Content-Type": "text/xml",
  };
}

export async function blueFolderRequest(endpoint, xml, signal, tokenOverride = "") {
  const token = envValue(tokenOverride) || getBlueFolderToken();
  if (!token) {
    return {
      ok: false,
      configured: false,
      reason: "missing_BLUEFOLDER_API_TOKEN",
      expectedEnv: "BLUEFOLDER_API_TOKEN",
    };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: blueFolderHeaders(token),
    body: xml,
    signal,
  });
  const raw = await response.text();
  const parsed = await parseBlueFolderXml(raw);
  const rootStatus = responseStatus(parsed);
  const ok = response.ok && rootStatus === "ok";

  return {
    ok,
    configured: true,
    endpoint,
    httpStatus: response.status,
    rootStatus,
    error: ok ? "" : responseError(parsed) || `BlueFolder returned ${response.status}`,
    raw,
    parsed,
  };
}

export async function getBlueFolderWorkOrderStatus(workOrder, signal) {
  const serviceRequestId = normalizeWorkOrder(workOrder);
  if (!serviceRequestId) {
    return {
      ok: true,
      skipped: true,
      reason: "missing_work_order",
    };
  }

  const requestXml = `<request>
  <serviceRequestId>${xmlEscape(serviceRequestId)}</serviceRequestId>
  <groupItemsByType>false</groupItemsByType>
</request>`;

  const result = await blueFolderRequest(
    BLUEFOLDER_ENDPOINTS.serviceRequestGet,
    requestXml,
    signal
  );
  if (!result.ok) {
    return {
      ...result,
      reason: result.reason || "bluefolder_status_request_failed",
      responsePreview: String(result.raw || "").slice(0, 500),
    };
  }

  const serviceRequest = responseRoot(result.parsed)?.serviceRequest || {};
  const status = getFirst(serviceRequest.status) || "";
  const dateTimeClosed = getFirst(serviceRequest.dateTimeClosed) || "";
  const returnedId =
    getFirst(serviceRequest.serviceRequestId) || serviceRequestId;

  return {
    ok: true,
    configured: true,
    source: "bluefolder_api",
    endpoint: BLUEFOLDER_ENDPOINTS.serviceRequestGet,
    serviceRequestId: returnedId,
    status,
    dateTimeClosed,
    closed: isClosedStatus(status, dateTimeClosed),
  };
}

function latestDateUsed() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const suffix = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${year}.${month}.${day} ${String(hours).padStart(2, "0")}:${minutes} ${suffix}`;
}

function firstValue(value) {
  const first = getFirst(value);
  return first == null ? "" : String(first);
}

function normalizedEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function blueFolderUserDisplayName(user) {
  return (
    firstValue(user?.fullName) ||
    firstValue(user?.displayName) ||
    [firstValue(user?.firstName), firstValue(user?.lastName)]
      .filter(Boolean)
      .join(" ") ||
    [firstValue(user?.firstname), firstValue(user?.lastname)]
      .filter(Boolean)
      .join(" ") ||
    firstValue(user?.userName) ||
    firstValue(user?.username)
  ).trim();
}

export async function getBlueFolderUserByEmail(email, signal) {
  const emailToFind = normalizedEmail(email);
  if (!emailToFind) return null;

  const requestXml = `<request>
  <userList>
    <listType>full</listType>
  </userList>
</request>`;

  const result = await blueFolderRequest(
    BLUEFOLDER_ENDPOINTS.usersList,
    requestXml,
    signal
  );
  if (!result.ok) {
    return {
      ok: false,
      error: result.error || result.reason || "bluefolder_user_lookup_failed",
    };
  }

  const users = asArray(responseRoot(result.parsed)?.user);
  const user = users.find((entry) => {
    const userEmail =
      normalizedEmail(entry?.email) ||
      normalizedEmail(entry?.emailAddress) ||
      normalizedEmail(entry?.emailaddress);
    return userEmail === emailToFind;
  });
  if (!user) return null;

  return {
    ok: true,
    userId: firstValue(user.userId),
    email: emailToFind,
    displayName: blueFolderUserDisplayName(user),
    apiToken:
      firstValue(user.tokenApi) ||
      firstValue(user.tokenAPI) ||
      firstValue(user.apiToken) ||
      firstValue(user.token) ||
      "",
  };
}

function blueFolderComment(data) {
  return [
    `Name: ${firstValue(data.name)}`,
    `PN: ${firstValue(data.pn)}`,
    `SN: ${firstValue(data.sn)}`,
    `Status: ${firstValue(data.status)}`,
    `Local SN: ${firstValue(data.localsn || data.local_sn || data.localSN)}`,
    `Description: ${firstValue(data.description)}`,
  ].join("\n");
}

export async function addServiceItemToBlueFolder(data, signal) {
  const serviceRequestId = normalizeWorkOrder(
    data?.workOrder || data?.serviceRequestId
  );
  if (!data?.name) {
    return { ok: false, error: "Missing name", code: "missing_name" };
  }
  if (!serviceRequestId) {
    return {
      ok: false,
      error: "Missing workOrder field for BlueFolder",
      code: "missing_work_order",
    };
  }

  let submitter = data?.submittedByUserId
    ? {
        userId: firstValue(data.submittedByUserId),
        displayName: firstValue(data.submittedByName),
        email: normalizedEmail(data.submittedByEmail),
        apiToken: firstValue(data.submittedByApiToken),
      }
    : null;
  if (
    !submitter?.userId &&
    data?.submittedByEmail &&
    !data?.submittedByLookupAttempted
  ) {
    const foundUser = await getBlueFolderUserByEmail(data.submittedByEmail, signal);
    if (foundUser?.ok && foundUser.userId) {
      submitter = foundUser;
    }
  }
  const enrichedData = {
    ...data,
    submittedByUserId: submitter?.userId || data?.submittedByUserId || "",
    submittedByName: submitter?.displayName || data?.submittedByName || "",
    submittedByEmail: normalizedEmail(data?.submittedByEmail),
  };
  const materialRequestToken = submitter?.apiToken || "";
  if (enrichedData.submittedByEmail && !materialRequestToken) {
    return {
      ok: false,
      error: `BlueFolder user ${enrichedData.submittedByEmail} was not found with an API token. Add this user to BlueFolder Settings > API > Authorized API Users, then retry.`,
      code: "missing_submitter_api_token",
      submittedBy: {
        email: enrichedData.submittedByEmail,
        name: enrichedData.submittedByName || "",
        userId: enrichedData.submittedByUserId || "",
      },
    };
  }

  const uniqueName = "Service Item";
  const itemXml = `<request>
  <itemAdd>
    <itemType>materials</itemType>
    <itemName>${xmlEscape(uniqueName)}</itemName>
    <description>Service Item</description>
    <accountName></accountName>
    <isFlatRate>false</isFlatRate>
    <mfrDescription></mfrDescription>
    <mfrItemNo></mfrItemNo>
    <mfrName>BlueFolderTestManufacturer</mfrName>
    <notes>Service item</notes>
    <taxableDefault>false</taxableDefault>
    <unitCost>0.00</unitCost>
    <unitPrice>0.00</unitPrice>
    <unitListPrice>0.00</unitListPrice>
  </itemAdd>
</request>`;

  const itemResult = await blueFolderRequest(
    BLUEFOLDER_ENDPOINTS.itemAdd,
    itemXml,
    signal
  );
  const duplicateServiceItem =
    !itemResult.ok &&
    /another item that has the same/i.test(String(itemResult.raw || ""));
  if (!itemResult.ok && !duplicateServiceItem) {
    return {
      ok: false,
      error: "Failed to create material item",
      code: "item_create_failed",
      bluefolderError: itemResult.error,
      responsePreview: String(itemResult.raw || "").slice(0, 500),
    };
  }

  const itemId =
    responseRoot(itemResult.parsed)?.itemId || (duplicateServiceItem ? uniqueName : "");
  const materialXml = `<request>
  <serviceRequestAddMaterial>
    <serviceRequestId>${xmlEscape(serviceRequestId)}</serviceRequestId>
    <dateUsed>${xmlEscape(latestDateUsed())}</dateUsed>
    <quantity>1</quantity>
    <billingStatus>billable</billingStatus>
    <itemNo>${xmlEscape(uniqueName)}</itemNo>
    <itemDescription>Service Item</itemDescription>
    <itemUnitCost>0.00</itemUnitCost>
    <itemUnitPrice>0.00</itemUnitPrice>
    <comment>${xmlEscape(blueFolderComment(enrichedData))}</comment>
    <commentIsPublic>false</commentIsPublic>
    <taxable>false</taxable>
  </serviceRequestAddMaterial>
</request>`;

  const materialResult = await blueFolderRequest(
    BLUEFOLDER_ENDPOINTS.serviceRequestAddMaterial,
    materialXml,
    signal,
    materialRequestToken
  );
  if (!materialResult.ok) {
    return {
      ok: false,
      error: "Failed to add material to work order",
      code: "material_add_failed",
      bluefolderError: materialResult.error,
      responsePreview: String(materialResult.raw || "").slice(0, 500),
    };
  }

  return {
    ok: true,
    status: "BlueFolder updated successfully.",
    itemId,
    serviceRequestId,
    duplicateServiceItem,
    submittedBy: {
      email: enrichedData.submittedByEmail || "",
      name: enrichedData.submittedByName || "",
      userId: enrichedData.submittedByUserId || "",
    },
    submittedWithUserToken: Boolean(materialRequestToken),
  };
}

export function blueFolderDebugSummary(statusCheck) {
  if (!statusCheck) return null;
  return {
    ok: statusCheck.ok,
    configured: statusCheck.configured,
    source: statusCheck.source,
    endpoint: statusCheck.endpoint,
    httpStatus: statusCheck.httpStatus,
    rootStatus: statusCheck.rootStatus,
    status: statusCheck.status,
    dateTimeClosed: statusCheck.dateTimeClosed,
    closed: statusCheck.closed,
    reason: statusCheck.reason,
    error: statusCheck.error,
    responsePreview: statusCheck.responsePreview,
  };
}
