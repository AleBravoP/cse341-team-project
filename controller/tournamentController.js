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
};

const createTournament = async (req, res) => {
    //Validate request
    // if (!req.body.name) {
    //     res.status(400).send({ message: 'Tournament name can not be empty!' });
    //     return;
    // }

    //#swagger.tags = ["Tournaments"]
    //#swagger.summary = Create a new tournament
    const tournament = {
        ID: req.body.ID,
        name: req.body.name,
        imageURL: req.body.imageURL,
    };
    const response = await mongodb
        .getDatabase()
        .db()
        .collection("tournaments")
        .insertOne(tournament);
    if (response.acknowledged > 0){
        res.status(200).send({
            message: 'Tournament created',
            id: response.insertedId
        });
    }
    else {
        res.status(500).json(response.error || 'Some error occurred while creating the tournament.');
    }
};

const updateTournament = async (req, res) => {
    //#swagger.tags = ["Tournaments"]
    //#swagger.summary = Updates an existing tournament
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid tournament id to update a tournament.");
    }
    const tournamentId = new ObjectId(req.params.id);
    const tournament = {
        ID: req.body.ID,
        name: req.body.name,
        imageURL: req.body.imageURL,
    };
    const response = await mongodb
        .getDatabase()
        .db()
        .collection("tournaments")
        .replaceOne({ _id: tournamentId }, tournament);
    if (response.modifiedCount > 0) {
        res.status(200).send({
            message: 'Tournament updated'
          });
    } else {
        res.status(500).json(
            response.error || "Some error occured while trying to update tournament."
        );
    }
};

const deleteTournament = async (req, res) => {
    //#swagger.tags = ["Tournaments"]
    //#swagger.summary = Deletes an existing tournament
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid tournament id to delete a tournament.");
    }
    const tournamentId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection("tournaments").deleteOne({ _id: tournamentId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occurred while deleting a tournament.");
    }
};

module.exports = { getAllTournaments, getSingleTournament, updateTournament, createTournament, deleteTournament };