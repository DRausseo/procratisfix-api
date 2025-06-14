const express = require("express");
const passport = require("passport");
const router = express.Router();

// Iniciar login con Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Callback de Google después del login
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "/auth/success",
  })
);

// Ruta protegida de éxito
router.get("/success", (req, res) => {
  res.send(`Bienvenido, ${req.user.name}`);
});

module.exports = router;
