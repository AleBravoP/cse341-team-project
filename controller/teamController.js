const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllTeams = async (req, res) => {
    //#swagger.tags = ["Teams"]
    //#swagger.summary = Returns all teams
    const result = await mongodb.getDatabase().db().collection("teams").find();
    result.toArray().then((teams) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(teams);
    }).catch((err) => {
        res.status(400).json({ message: err });
    });
};

const getSingleTeam = async (req, res) => {
    //#swagger.tags = ["Teams"]
    //#swagger.summary = Returns a team by ID
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid team id to find a team.");
    }
    const teamId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("teams").find({ _id: teamId });
    result.toArray().then((teams) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(teams[0]);
    }).catch((err) => {
        res.status(400).json({ message: err});
    });
}

const updateTeam = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid team id to update a team.");
    }
    const teamId = new ObjectId(req.params.id);
    const team = {
        ID: req.body.ID,
        Name: req.body.Name,
        ShortName: req.body.ShortName,
        ImageURL: req.body.ImageURL,
    };
    const response = await mongodb
        .getDatabase()
        .db()
        .collection("teams")
        .replaceOne({ _id: teamId }, team);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(
            response.error || "Some error occured while trying to update team."
        );
    }
};

module.exports = { getAllTeams, getSingleTeam, updateTeam};