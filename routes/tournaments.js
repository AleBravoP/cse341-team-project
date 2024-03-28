const express = require("express");
const router = express.Router();

const tournamentController = require("../controller/tournamentController");

// Retrieve All Tournaments
router.get("/", tournamentController.getAllTournaments);

// Retrieve Tournament by Id
router.get("/:id", tournamentController.getSingleTournament);

// Create Tournament
router.post("/", tournamentController.createTournament);

// Update Tournament by Id
router.put("/:id", tournamentController.updateTournament);

module.exports = router;