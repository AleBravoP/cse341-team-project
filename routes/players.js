const express = require("express");
const router = express.Router();

const playerController = require("../controller/playerController");

// Retrieve All Players
router.get("/", playerController.getAllPlayers);

// Retrieve Player by Id
router.get("/:id", playerController.getSinglePlayer);

module.exports = router;