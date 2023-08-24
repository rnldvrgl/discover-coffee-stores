import { table, getMinifiedRecords } from "@/lib/airtable";

const getCoffeeStoreById = async (req, res) => {
    const { id } = req.query;

    try {
        if (id) {
            const findCoffeeStoreRecords = await table
                .select({
                    filterByFormula: `id="${id}"`,
                })
                .firstPage();

            if (findCoffeeStoreRecords.length !== 0) {
                const records = getMinifiedRecords(findCoffeeStoreRecords);
                res.json(records);
            } else {
                res.json({ message: 'id could not be found' })
            }
        } else {
            res.status(400);
            res.json({ message: `ID is missing` })
        }

    } catch (error) {
        console.error("There is an error", error);
        res.status(500);
        res.json({ message: "Something went wrong.", error })
    }

    return res;
}

export default getCoffeeStoreById;