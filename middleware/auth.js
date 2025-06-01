exports.ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res
    .status(401)
    .json({ message: "No autorizado. Por favor inicia sesión con Google." });
};
