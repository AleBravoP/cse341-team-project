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
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving all teams.'
        });
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
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving the team.'
        });
      });
};

const createTeam = async (req, res) => {
    //Validation
    if (!req.body.name) {
        res.status(400).send({ message: 'Name can not be empty!' });
        return;
      }
    
      if (!req.body.shortName) {
        res.status(400).send({ message: 'Short name can not be empty!' });
        return;
      }
    //#swagger.tags = ["Teams"]
    //#swagger.summary = Create a new team
    const team = {
        ID: req.body.ID,
        name: req.body.name,
        shortName: req.body.shortName,
        imageURL: req.body.imageURL,
    };
    const response = await mongodb
        .getDatabase()
        .db()
        .collection("teams")
        .insertOne(team);
    if (response.acknowledged > 0){
    res.status(200).send({
        message: 'Team created.' 
      });
    }
    else {
    res.status(500).json(response.error || 'Some error occurred while creating the team.');
    }
};

const updateTeam = async (req, res) => {
    //#swagger.tags = ["Teams"]
    //#swagger.summary = Updates an existing team
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid team id to update a team.");
    }
    const teamId = new ObjectId(req.params.id);
    const team = {
        ID: req.body.ID,
        name: req.body.name,
        shortName: req.body.shortName,
        imageURL: req.body.imageURL,
    };
    const response = await mongodb
        .getDatabase()
        .db()
        .collection("teams")
        .replaceOne({ _id: teamId }, team);
    if (response.modifiedCount > 0) {
        res.status(200).send({
            message: 'Team updated'
          });
    } else {
        res.status(500).json(
            response.error || "Some error occured while trying to update the team."
        );
    }
};

const deleteTeam = async (req, res) => {
    //#swagger.tags = ["Teams"]
    //#swagger.summary = Deletes an existing team
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid team id to delete a team.");
    }
    const teamId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection("teams").deleteOne({ _id: teamId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occurred while deleting a team.");
    }
}

module.exports = { getAllTeams, getSingleTeam, updateTeam, createTeam, deleteTeam };