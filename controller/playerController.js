const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllPlayers = async (req, res) => {
    //#swagger.tags = ["Players"]
    //#swagger.summary = Returns all players
    const result = await mongodb.getDatabase().db().collection("players").find();
    result.toArray().then((players) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(players);
    }).catch((err) => {
        res.status(400).json({ message: err });
    });
};

const getSinglePlayer = async (req, res) => {
    //#swagger.tags = ["Players"]
    //#swagger.summary = Return a player by ID
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid player id to find a player.");
    }
    const playerId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("players").find({ _id: playerId });
    result.toArray().then((players) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(players[0]);
    }).catch((err) => {
        res.status(400).jsson({ message: err });
    })
}

module.exports = { getAllPlayers, getSinglePlayer }