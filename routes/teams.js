const express = require("express");
const router = express.Router();

const teamController = require("../controller/teamController");

const validation = require("../middleware/validate");

// Retrieve All Teams
router.get("/", teamController.getAllTeams);

// Retrieve Team by Id
router.get("/:id", teamController.getSingleTeam);

// Create Team
router.post("/", validation.validateTeam, teamController.createTeam);

// Update Team by Id
router.put("/:id", validation.validateTeam, teamController.updateTeam);

// Delete Team by Id
router.delete("/:id", teamController.deleteTeam);

module.exports = router;
