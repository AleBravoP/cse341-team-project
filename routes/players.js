const express = require("express");
const router = express.Router();

const playerController = require("../controller/playerController");

const validation = require("../middleware/validate");

// Retrieve All Players
router.get("/", playerController.getAllPlayers);

// Retrieve Player by Id
router.get("/:id", playerController.getSinglePlayer);

// Create Player
router.post("/", validation.validatePlayer, playerController.createPlayer);

// Update Player by Id
router.put("/:id", validation.validatePlayer, playerController.updatePlayer);

// Delete Player by Id
router.delete("/:id", playerController.deletePlayer);

module.exports = router;
