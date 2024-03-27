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
    //#swagger.summary = Returns a player by ID
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid player id to find a player.");
    }
    const playerId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("players").find({ _id: playerId });
    result.toArray().then((players) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(players[0]);
    }).catch((err) => {
        res.status(400).json({ message: err });
    });
}

const updatePlayer = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid player id to update a player.");
    }
    const playerId = new ObjectId(req.params.id);
    const player = {
        ID: req.body.ID,
        Forename: req.body.Forename,
        Surname: req.body.Surname,
        ImageURL: req.body.ImageURL,
    };
    const response = await mongodb
        .getDatabase()
        .db()
        .collection("players")
        .replaceOne({ _id: playerId }, player);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(
            response.error || "Some error occured while trying to update player."
        );
    }
};

module.exports = { getAllPlayers, getSinglePlayer, updatePlayer };
