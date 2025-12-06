const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "QSPIDERS EDTECH",
      version: "1.0.0",
    },
    servers: [{ url: `http://localhost:5000/api/v1` }],
  },
  tags: [
    { name: "Auth", description: "User authentication APIs" },
    { name: "User", description: "User-related APIs" },
    { name: "Bootcamp", description: "Bootcamp management APIs" },
    { name: "Course", description: "Course management APIs" },
  ],
  apis: [path.join(__dirname, "../docs/**/*.js")],
};

const specs = swaggerJSDoc(options);

module.exports = { specs };
