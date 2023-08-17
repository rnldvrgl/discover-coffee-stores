const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_TOKEN }).base(process.env.AIRTABLE_BASE_KEY);


const table = base('coffee-stores');

console.log(table)

const createCoffeeStore = async (req, res) => {

    if (req.method == 'POST') {
        try {
            const findCoffeeStoreRecords = await table.select({
                filterByFormula: `id=${req.query.id}`
            }).firstPage();

            if (findCoffeeStoreRecords.length !== 0) {
                const records = findCoffeeStoreRecords.map((record) => {
                    return {
                        ...record.fields,
                    }
                })

                res.json(records);
            } else {
                res.json({ message: "No coffee store found." });
            }
        } catch (error) {
            console.error("There is an error", error);
            res.status(500);
            res.json({ message: "Something went wrong.", error })
        }
    }
}

export default createCoffeeStore;