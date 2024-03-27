const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllTournaments = async (req, res) => {
    //#swagger.tags = ["Tournaments"]
    //#swagger.summary = Returns all tournaments
    const result = await mongodb.getDatabase().db().collection("tournaments").find();
    result.toArray().then((tournaments) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(tournaments);
    }).catch((err) => {
        res.status(400).json({ message: err });
    });
};

const getSingleTournament = async (req, res) => {
    //#swagger.tags = ["Tournaments"]
    //#swagger.summary = Returns a tournament by ID
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid tournament id to find a tournament.");
    }
    const tournamentId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("tournaments").find({ _id: tournamentId });
    result.toArray().then((tournaments) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(tournaments[0]);
    }).catch((err) => {
        res.status(400).json({ message: err });
    });
}

module.exports = { getAllTournaments, getSingleTournament };