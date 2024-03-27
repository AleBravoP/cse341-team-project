const express = require("express");
const router = express.Router();

const tournamentController = require("../controller/tournamentController");

// Retrieve All Tournaments
router.get("/", tournamentController.getAllTournaments);

// Retrieve Tournament by Id
router.get("/:id", tournamentController.getSingleTournament);

module.exports = router;