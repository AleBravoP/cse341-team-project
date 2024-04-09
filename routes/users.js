const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");
const { isAuthenticated } = require('../middleware/authenticate');

const validation = require("../middleware/validate");

// Retrieve All Users
router.get("/", userController.getAllUsers);

// Retrieve User by Id
router.get("/:id", userController.getSingleUser);

// Create User
router.post("/", isAuthenticated, validation.validateUser, userController.createUser);

// Update User by Id
router.put("/:id", isAuthenticated, validation.validateUser, userController.updateUser);

// Delete User by Id
router.delete("/:id", isAuthenticated, userController.deleteUser);

module.exports = router;
