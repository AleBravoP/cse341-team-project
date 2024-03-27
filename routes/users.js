const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");

// Retrieve All Users
router.get("/", userController.getAllUsers);

// Retrieve User by Id
router.get("/:id", userController.getSingleUser);

// Update User by Id
router.put("/:id", userController.updateUser);

module.exports = router;