const express = require("express");
const router = express.Router();

const playerController = require("../controller/playerController");
const { isAuthenticated } = require('../middleware/authenticate');

const validation = require("../middleware/validate");

// Retrieve All Players
router.get("/", playerController.getAllPlayers);

// Retrieve Player by Id
router.get("/:id", playerController.getSinglePlayer);

router.post("/", isAuthenticated, validation.validatePlayer, playerController.createPlayer);

// Update Player by Id
router.put("/:id", isAuthenticated, validation.validatePlayer, playerController.updatePlayer);

// Delete Player by Id
router.delete("/:id", isAuthenticated, playerController.deletePlayer);

module.exports = router;
