const express = require("express");
const router = express.Router();
const passport = require("passport");

const playerRoute = require("./players");
const teamRoute = require("./teams");
const tournamentRoute = require("./tournaments");
const userRoute = require("./users");

router.use("/", require("./swagger"));

router.use("/players", playerRoute);
router.use("/teams", teamRoute);
router.use("/tournaments", tournamentRoute);
router.use("/users", userRoute);
router.get("/login", passport.authenticate("github"), (req, res) => {});
router.get("/logout", function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

module.exports = router;