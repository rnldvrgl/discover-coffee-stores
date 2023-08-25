import { findRecordByFilter, getMinifiedRecords, table } from "@/lib/airtable";

const upvoteCoffeeStoreById = async (req, res) => {
    if (req.method === "PUT") {
        try {
            const { id } = req.body;

            if (id) {
                const records = await findRecordByFilter(id);

                if (records.length !== 0) {

                    const record = records[0];

                    const calculateVoting = parseInt(record.voting) + parseInt(1);

                    const updateRecord = await table.update([{
                        id: record.recordId,
                        fields: {
                            voting: calculateVoting,
                        }
                    }]);
                    if (updateRecord) {
                        const minifiedRecords = getMinifiedRecords(updateRecord);
                        res.json({ minifiedRecords })
                    }
                } else {
                    res.json({ message: "Coffee Store doesn't exist", id })
                }
            } else {
                res.status(400);
                res.json({ message: "Id is missing" })
            }

        } catch (error) {
            res.status(500);
            res.json({ message: "Something went wrong.", error })
        }
    }
}


export default upvoteCoffeeStoreById;