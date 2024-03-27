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
}

module.exports = { getAllUsers, getSingleUser };