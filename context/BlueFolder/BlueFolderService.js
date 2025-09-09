// bluefolderService.js
import fetch from 'node-fetch';
import xml2js from 'xml2js'; // Convert XML response to JSON

export async function getWorkOrders(apiToken) {
  const parser = new xml2js.Parser();
  const res = await fetch('https://app.bluefolder.com/api/2.0/workOrders/list.aspx', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(apiToken + ':x').toString('base64')}`,
      'Content-Type': 'text/xml'
    },
    body: '<request><listType>full</listType></request>'
  });

  const xmlData = await res.text();
  const jsonData = await parser.parseStringPromise(xmlData);
  return jsonData; // Assuming XML response is parsed to JSON
}
