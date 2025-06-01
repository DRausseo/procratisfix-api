// swagger/swaggerOptions.js
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ProcrastiFix API",
      version: "1.0.0",
      description: "API para usuarios con problemas de procrastinación",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

module.exports = options;
