const validator = require("../helpers/validate");

const validatePlayer = (req, res, next) => {
    const validationRules = {
        ID: "required|integer",
        forename: "required|string",
        surname: "required|string",
        imageURL: "required|string"
    };
    validator(req.body, validationRules, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: "Validation failed",
                data: err
            });
        } else {
            next();
        }
    });
};

const validateTeam = (req, res, next) => {
    const validationRules = {
        ID: "required|integer",
        name: "required|string",
        shortName: "required|string",
        imageURL: "required|string"
    };
    validator(req.body, validationRules, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: "Validation failed",
                data: err
            });
        } else {
            next();
        }
    });
};

const validateTournament = (req, res, next) => {
    const validationRules = {
        ID: "required|integer",
        name: "required|string",
        imageURL: "required|string"
    };
    validator(req.body, validationRules, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: "Validation failed",
                data: err
            });
        } else {
            next();
        }
    });
};

const validateUser = (req, res, next) => {
    const validationRules = {
        accountID: "required|integer",
        forename: "required|string",
        surname: "required|string",
        email: "required|email",
        birthday: "required|string",
        favorite_color: "required|string",
        favorite_team: "required|string",
        favorite_player: "required|string"
    };
    validator(req.body, validationRules, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: "Validation failed",
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = { validatePlayer, validateTeam, validateTournament, validateUser };