const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { ensureAuth } = require("../middleware/auth");

// Todas las rutas protegidas
router.get("/", ensureAuth, userController.getUsers);
router.get("/:id", ensureAuth, userController.getUserById);

module.exports = router;
