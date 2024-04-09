const express = require("express");
const router = express.Router();

const tournamentController = require("../controller/tournamentController");
const { isAuthenticated } = require('../middleware/authenticate');

const validation = require("../middleware/validate");

// Retrieve All Tournaments
router.get("/", tournamentController.getAllTournaments);

// Retrieve Tournament by Id
router.get("/:id", tournamentController.getSingleTournament);

// Create Tournament
router.post("/", isAuthenticated, validation.validateTournament, tournamentController.createTournament);

// Update Tournament by Id
router.put("/:id", isAuthenticated, validation.validateTournament, tournamentController.updateTournament);

// Delete Tournament by Id
router.delete("/:id", isAuthenticated, tournamentController.deleteTournament);

module.exports = router;
