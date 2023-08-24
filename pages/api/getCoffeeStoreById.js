import { fetchCoffeeStores } from "@/lib/coffee-store";

const getCoffeeStoresById = async (req, res) => {
    const { id } = req.query;

    try {
        if (id) {
            const response = await fetchCoffeeStores(latLong, limit);

            res.status(200);
            res.json({ message: `ID is created ${id}` });
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

export default getCoffeeStoresById;

// http://localhost:3000/api/getCoffeeStoresByLocation?latLong=34,45&limit=30