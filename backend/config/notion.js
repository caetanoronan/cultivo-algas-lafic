require('dotenv').config();
const { Client } = require('@notionhq/client');

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

if (!NOTION_TOKEN) {
  throw new Error('NOTION_TOKEN não definido');
}

if (!NOTION_DATABASE_ID) {
  throw new Error('NOTION_DATABASE_ID não definido');
}

const notion = new Client({ auth: NOTION_TOKEN });

module.exports = {
  notion,
  NOTION_DATABASE_ID,
};