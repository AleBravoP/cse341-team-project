const express = require("express");
const router = express.Router();

const teamController = require("../controller/teamController");
const { isAuthenticated } = require('../middleware/authenticate');

// Retrieve All Teams
router.get("/", teamController.getAllTeams);

// Retrieve Team by Id
router.get("/:id", teamController.getSingleTeam);

// Create Team
router.post("/", isAuthenticated, teamController.createTeam);

// Update Team by Id
router.put("/:id", isAuthenticated, teamController.updateTeam);

// Delete Team by Id
router.delete("/:id", isAuthenticated, teamController.deleteTeam);

module.exports = router;
