export default function handler(req, res) {
    const breed = req.query.breed;
    res.status(200).json({ message: `I love ${breed}` })
}