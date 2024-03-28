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

router.use("/players", playerRoute);
router.use("/teams", teamRoute);
router.use("/tournaments", tournamentRoute);
router.use("/users", userRoute);

module.exports = router;