const upvoteCoffeeStoreById = async (req, res) => {
    const { id } = req.query;

    //     try {
    //         const { latLong, limit } = req.query;

    //         const response = await fetchCoffeeStores(latLong, limit);

    //         res.status(200);
    //         res.json(response);

    //     } catch(error) {
    //         console.error("There is an error", error);
    //         res.status(500);
    //         res.json({ message: "Something went wrong.", error })
    //     }

    // return res;
}

export default upvoteCoffeeStoreById;