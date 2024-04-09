const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const indexRoute = require("./routes/index");
const mongodb = require("./data/database");
const bodyParser = require("body-parser");
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json())
    .use(
        session({
            secret: 'secret',
            resave: false,
            saveUninitialized: true,
        })
    )
    .use(passport.initialize())
    .use(passport.session())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Orgin, X-Requested-With, COntent-Type, Accept, Z-Key'
        );
        res.setHeader(
            'Access-Control-Allow-Methods',
            'POST, GET, PUT, PATCH, OPTIONS, DELETE'
        );
        next()
    })
    .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))
    .use(cors({ orgin: '*' }))
    .use("/", indexRoute);


passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL
        },
        function (accessToken, refreshToken, profile, done) {
            return done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

process.on("uncaughtException", (err, origin) => {
    console.log(
        process.stderr.fd,
        `Caught exception: ${err}\n` + `Exception origin: ${origin}`
    );
});

app.get(
    '/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/api-docs',
        session: false,
    }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    }
);

app.get('/', (req, res) => {
    res.send(
        req.session.user !== undefined
            ? `Logged in as ${req.session.user.username}`
            : 'Logged Out'
    );
});

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
});

app.listen(port, () => {
    console.log(`Connected to database and listening on port ${port}.`);
});

module.exports = app;