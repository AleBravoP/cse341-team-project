const express = require("express");
const router = express.Router();

const playerController = require("../controller/playerController");
const { isAuthenticated } = require('../middleware/authenticate');

// Retrieve All Players
router.get("/", playerController.getAllPlayers);

// Retrieve Player by Id
router.get("/:id", playerController.getSinglePlayer);

// Create Player
router.post("/", isAuthenticated, playerController.createPlayer);

// Update Player by Id
router.put("/:id", isAuthenticated, playerController.updatePlayer);

// Delete Player by Id
router.delete("/:id", isAuthenticated, playerController.deletePlayer);

module.exports = router;
