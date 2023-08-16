import { fetchCoffeeStores } from "@/lib/coffee-store";

const getCoffeeStoresByLocation = async (req, res) => {
    try {
        const { latLong, limit } = req.query;

        const response = await fetchCoffeeStores(latLong, limit);

        res.status(200);
        res.json(response);

    } catch (error) {
        console.error("There is an error", error);
        res.status(500);
        res.json({ message: "Something went wrong.", error })
    }

    return res;
}

export default getCoffeeStoresByLocation;

// http://localhost:3000/api/getCoffeeStoresByLocation?latLong=34,45&limit=30