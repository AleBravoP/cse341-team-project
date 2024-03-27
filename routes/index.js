const express = require("express");
const router = express.Router();

const playerRoute = require("./players");
const teamRoute = require("./teams");
const tournamentRoute = require("./tournaments");
const userRoute = require("./users");

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
    res.send("Welcome to cse341 final project");
});

router.use("/player", playerRoute);
router.use("/team", teamRoute);
router.use("/tournament", tournamentRoute);
router.use("/user", userRoute);

module.exports = router;