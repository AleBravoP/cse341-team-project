const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");

// Retrieve All Users
router.get("/", userController.getAllUsers);

// Retrieve User by Id
router.get("/:id", userController.getSingleUser);

module.exports = router;