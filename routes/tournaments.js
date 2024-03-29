const express = require("express");
const router = express.Router();

const tournamentController = require("../controller/tournamentController");

// Retrieve All Tournaments
router.get("/", tournamentController.getAllTournaments);

// Retrieve Tournament by Id
router.get("/:id", tournamentController.getSingleTournament);

// Update Tournament by Id
router.put("/:id", tournamentController.updateTournament);

// Update Tournament by Id
router.put("/:id", tournamentController.updateTournament);

// Delete Tournament by Id
router.delete("/:id", tournamentController.deleteTournament);

module.exports = router;
