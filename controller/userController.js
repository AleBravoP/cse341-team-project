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
    // Validate request
    // if (!req.body.forename) {
    //     res.status(400).send({ message: 'Name can not be empty!' });
    //     return;
    // }

    // if (!req.body.surname) {
    //     res.status(400).send({ message: 'Last name can not be empty!' });
    //     return;
    // }

    // if (!req.body.email) {
    //     res.status(400).send({ message: 'Email can not be empty!' });
    //     return;
    // }

    // if (!req.body.birthday) {
    //     res.status(400).send({ message: 'Birthday name can not be empty!' });
    //     return;
    // }

    // if (!req.body.favorite_color) {
    //     res.status(400).send({ message: 'Favorite color can not be empty!' });
    //     return;
    // }

    // if (!req.body.favorite_team) {
    //     res.status(400).send({ message: 'Favorite team name can not be empty!' });
    //     return;
    // }
    // if (!req.body.favorite_player) {
    //     res.status(400).send({ message: 'Favorite player can not be empty!' });
    //     return;
    // };

    //#swagger.tags = ["Users"]
    //#swagger.summary = Create a new user
    const user = {
        accountID: req.body.accountID,
        forename: req.body.forename,
        surname: req.body.surname,
        email: req.body.email,
        birthday: req.body.birthday,
        favorite_color: req.body.favorite_color,
        favorite_team: req.body.favorite_team,
        favorite_player: req.body.favorite_player
    };
    const response = await mongodb
        .getDatabase()
        .db()
        .collection("users")
        .insertOne(user);
    if (response.acknowledged > 0){
        res.status(200).send({
            message: 'User created with id: ' + response.insertedId,
            id: response.insertedId
        });
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
        accountID: req.body.accountID,
        forename: req.body.forename,
        surname: req.body.surname,
        email: req.body.email,
        birthday: req.body.birthday,
        favorite_color: req.body.favorite_color,
        favorite_team: req.body.favorite_team,
        favorite_player: req.body.favorite_player
    };
    const response = await mongodb
        .getDatabase()
        .db()
        .collection("users")
        .replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
        res.status(200).send({
            message: 'User updated'
        });
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