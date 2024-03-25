const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Teams API",
        description: "Teams API"
    },
    host: "localhost:3000",
    schemes: ["http"]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);