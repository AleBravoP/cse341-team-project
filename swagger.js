const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Teams API",
        description: "Teams API"
    },
    host: "cse341-team-project.onrender.com",
    schemes: ["https"]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);