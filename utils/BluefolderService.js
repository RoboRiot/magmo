// BluefolderService.js

export const API_TOKEN = "9b224624-44db-49dd-9042-c3b15e9a39d4"; // your token
export const ITEMS_URL = "https://app.bluefolder.com/api/2.0/items/add.aspx";
export const MATERIALS_URL = "https://app.bluefolder.com/api/2.0/serviceRequests/addMaterial.aspx";
export const HEADERS = { "Content-Type": "text/xml" };

export async function addServiceItem(serviceRequestId, item) {
  // Use "Service Item" for name and description
  const uniqueName = "Service Item";

  // Step 1: Create a new material item in BlueFolder
  const itemPayload = `
    <request>
      <itemAdd>
        <itemType>materials</itemType>
        <itemName>${uniqueName}</itemName>
        <description>Service Item</description>
        <accountName></accountName>
        <isFlatRate>false</isFlatRate>
        <mfrDescription></mfrDescription>
        <mfrItemNo></mfrItemNo>
        <mfrName>BlueFolderTestManufacturer</mfrName>
        <notes>Service Item</notes>
        <taxableDefault>true</taxableDefault>
        <unitCost>0.00</unitCost>
        <unitPrice>0.00</unitPrice>
        <unitListPrice>0.00</unitListPrice>
      </itemAdd>
    </request>
  `;
  
  const itemResponse = await fetch(ITEMS_URL, {
    method: "POST",
    headers: { ...HEADERS, Authorization: "Basic " + btoa(API_TOKEN + ":x") },
    body: itemPayload,
  });
  const itemText = await itemResponse.text();
  const parser = new DOMParser();
  const itemXml = parser.parseFromString(itemText, "application/xml");
  if (itemXml.documentElement.getAttribute("status") !== "ok") {
    throw new Error("Failed to create material item in BlueFolder");
  }
  const itemIdElem = itemXml.getElementsByTagName("itemId")[0];
  const itemId = itemIdElem ? itemIdElem.textContent : null;

  // Step 2: Add the material to the specified work order
  const nowStr = new Date().toLocaleString("en-US", { 
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hour12: true 
  });
  const comment = `Name: ${item.name}\nPN: ${item.pn}\nSN: ${item.sn}\nStatus: ${item.status}\nDescription: ${item.description}`;
  const materialPayload = `
    <request>
      <serviceRequestAddMaterial>
        <serviceRequestId>${serviceRequestId}</serviceRequestId>
        <dateUsed>${nowStr}</dateUsed>
        <quantity>1</quantity>
        <billingStatus>billable</billingStatus>
        <itemNo>${uniqueName}</itemNo>
        <itemDescription>Service Item</itemDescription>
        <itemUnitCost>0.00</itemUnitCost>
        <itemUnitPrice>0.00</itemUnitPrice>
        <comment>${comment}</comment>
        <commentIsPublic>false</commentIsPublic>
        <taxable>true</taxable>
      </serviceRequestAddMaterial>
    </request>
  `;
  const materialResponse = await fetch(MATERIALS_URL, {
    method: "POST",
    headers: { ...HEADERS, Authorization: "Basic " + btoa(API_TOKEN + ":x") },
    body: materialPayload,
  });
  const materialText = await materialResponse.text();
  const materialXml = parser.parseFromString(materialText, "application/xml");
  if (materialXml.documentElement.getAttribute("status") !== "ok") {
    throw new Error("Failed to add material to work order in BlueFolder");
  }
  return { itemId, materialResponse: materialText };
}
