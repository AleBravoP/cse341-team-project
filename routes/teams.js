const express = require("express");
const router = express.Router();

const teamController = require("../controller/teamController");

// Retrieve All Teams
router.get("/", teamController.getAllTeams);

// Retrieve Team by Id
router.get("/:id", teamController.getSingleTeam);

module.exports = router;