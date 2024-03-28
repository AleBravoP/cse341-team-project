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

// Delete Tournament by Id
router.delete("/:id", tournamentController.deleteTournament);

module.exports = router;