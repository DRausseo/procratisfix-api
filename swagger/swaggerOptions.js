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
        url: "https://procratisfix-api.onrender.com",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

module.exports = options;
