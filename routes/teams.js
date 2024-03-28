const express = require("express");
const router = express.Router();

const teamController = require("../controller/teamController");
const { updatePlayer } = require("../controller/playerController");

// Retrieve All Teams
router.get("/", teamController.getAllTeams);

// Retrieve Team by Id
router.get("/:id", teamController.getSingleTeam);

// Update Team by Id
router.put("/:id", teamController.updateTeam);

// Delete Team by Id
router.delete("/:id", teamController.deleteTeam);

module.exports = router;