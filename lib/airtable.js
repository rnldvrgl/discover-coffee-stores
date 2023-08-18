const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_TOKEN }).base(
    process.env.AIRTABLE_BASE_KEY
);

const table = base("coffee-stores");