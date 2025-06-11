// app.js
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("./config/passport");

const app = express();

// ─────────────────────────────────────────────────────────────
// Middlewares globales
// ─────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// Session y Passport deben ir antes de registrar rutas
app.use(
  session({
    secret: "clave-secreta-procratisfix",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerOptions = require("./swagger/swaggerOptions");

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// ─────────────────────────────────────────────────────────────
// Importar rutas
// ─────────────────────────────────────────────────────────────
const goalsRoutes = require("./routes/goals");
const tasksRoutes = require("./routes/tasks");
const routinesRoutes = require("./routes/routines");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/user");

// ─────────────────────────────────────────────────────────────
// Registrar rutas
// ─────────────────────────────────────────────────────────────
app.use("/api/goals", goalsRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/routines", routinesRoutes);
app.use("/auth", authRoutes);
app.use("/api/users", usersRoutes);

// Ruta raíz de prueba
app.get("/", (req, res) => {
  res.send("ProcrastiFix API funcionando!");
});

// ─────────────────────────────────────────────────────────────
// Exportar la app
// ─────────────────────────────────────────────────────────────
module.exports = app;
