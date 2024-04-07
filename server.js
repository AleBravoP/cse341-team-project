const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const indexRoute = require("./routes/index");
const mongodb = require("./data/database");
const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
        );
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, DELETE, OPTIONS"
        );
        next()
    })
    .use("/", indexRoute);

process.on("uncaughtException", (err, origin) => {
    console.log(
        process.stderr.fd,
        `Caught exception: ${err}\n` + `Exception origin: ${origin}`
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