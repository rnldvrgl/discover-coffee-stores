const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_TOKEN }).base(process.env.AIRTABLE_BASE_KEY);


const table = base('coffee-stores');

console.log(table)

const createCoffeeStore = (req, res) => {

    if (req.method == 'POST') {
        res.json({ message: "POST" });
    } else if (req.method == 'GET') {
        res.json({ message: "GET" });
    }
}

export default createCoffeeStore;