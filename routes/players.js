const express = require("express");
const router = express.Router();

const playerController = require("../controller/playerController");

// Retrieve All Players
router.get("/", playerController.getAllPlayers);

// Retrieve Player by Id
router.get("/:id", playerController.getSinglePlayer);

// Update Player by Id
router.put("/:id", playerController.updatePlayer);

// Delete Player by Id
router.delete("/:id", playerController.deletePlayer);

module.exports = router;