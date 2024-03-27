const express = require("express");
const router = express.Router();

const tournamentController = require("../controller/tournamentController");

// Retrieve All Tournaments
router.get("/", tournamentController.getAllTournaments);

// Retrieve Tournament by Id
router.get("/:id", tournamentController.getSingleTournament);

// Update Tournament by Id
router.put("/:id", tournamentController.updateTournament);

module.exports = router;