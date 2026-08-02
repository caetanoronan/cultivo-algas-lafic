const { notion, NOTION_DATABASE_ID } = require('../config/notion');
const { toMeasurementResponse, toMeasurementPageProperties } = require('../models/measurement');

async function listMeasurements() {
  const response = await notion.databases.query({
    database_id: NOTION_DATABASE_ID,
    sorts: [{ property: 'Data da Medição', direction: 'descending' }],
  });

  return response.results.map(toMeasurementResponse);
}

async function createMeasurement(measurement) {
  const page = await notion.pages.create({
    parent: { database_id: NOTION_DATABASE_ID },
    properties: toMeasurementPageProperties(measurement),
  });

  return page;
}

module.exports = {
  listMeasurements,
  createMeasurement,
};