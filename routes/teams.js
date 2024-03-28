const express = require("express");
const router = express.Router();

const teamController = require("../controller/teamController");
const { updatePlayer } = require("../controller/playerController");

// Retrieve All Teams
router.get("/", teamController.getAllTeams);

// Retrieve Team by Id
router.get("/:id", teamController.getSingleTeam);

// Create Tournament
router.post("/", teamController.createTeam);

// Update Team by Id
router.put("/:id", teamController.updateTeam);

module.exports = router;