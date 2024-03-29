const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllUsers = async (req, res) => {
    //#swagger.tags = ["Users"]
    //#swagger.summary = Returns all users
    const result = await mongodb.getDatabase().db().collection("users").find();
    result.toArray().then((users) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(users);
    }).catch((err) => {
        res.status(400).json({ message: err });
    });
};

const getSingleUser = async (req, res) => {
    //#swagger.tags = ["Users"]
    //#swagger.summary = Returns a user by ID
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid user id to find a user.");
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("users").find({ _id: userId });
    result.toArray().then((users) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(users[0]);
    }).catch((err) => {
        res.status(400).json({ message: err });
    });
};

const createUser = async (req, res) => {
    //#swagger.tags = ["User"]
    //#swagger.summary = Create a new user
    const user = {
        AccountID: req.body.AccountID,
        Forename: req.body.Forename,
        Surname: req.body.Surname,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
        Favorite_color: req.body.Favorite_color,
        Favorite_team: req.body.Favorite_team,
        Favorite_player: req.body.Favorite_player
    };
    const response = await mongodb
        .getDatabase()
        .db()
        .collection("users")
        .insertOne(user);
    if (response.acknowledged > 0){
    res.status(204).send();
    }
    else {
    res.status(500).json(response.error || 'Some error occurred while creating the user.');
    }
};

const createUser = async (req, res) => {
    //#swagger.tags = ["Users"]
    //#swagger.summary = Create a new user
    const user = {
        AccountID: req.body.AccountID,
        Forename: req.body.Forename,
        Surname: req.body.Surname,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
        Favorite_color: req.body.Favorite_color,
        Favorite_team: req.body.Favorite_team,
        Favorite_player: req.body.Favorite_player
    };
    const response = await mongodb
        .getDatabase()
        .db()
        .collection("users")
        .insertOne(user);
    if (response.acknowledged > 0){
    res.status(204).send();
    }
    else {
    res.status(500).json(response.error || 'Some error occurred while creating the user.');
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags = ["Users"]
    //#swagger.summary = Updates an existing user
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid user id to update a user.");
    }
    const userId = new ObjectId(req.params.id);
    const user = {
        // I would like to change the names of these fields to the names below to be more consistent accross the project and remove spaces
        AccountID: req.body.AccountID,
        Forename: req.body.Forename,
        Surname: req.body.Surname,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
        Favorite_color: req.body.Favorite_color,
        Favorite_team: req.body.Favorite_team,
        Favorite_player: req.body.Favorite_player
    };
    const response = await mongodb
        .getDatabase()
        .db()
        .collection("users")
        .replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(
            response.error || "Some error occured while trying to update user."
        );
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags = ["Users"]
    //#swagger.summary = Deletes an existing user
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid user id to delete a user.");
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection("users").deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occurred while deleting a user.");
    }
}

module.exports = { getAllUsers, getSingleUser, updateUser, createUser, deleteUser };