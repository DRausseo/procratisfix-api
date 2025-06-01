const Goal = require("../models/Goal");

// ─────────────────────────────────────────────────────────────
// GET /api/goals - Obtener todas las metas
// ─────────────────────────────────────────────────────────────
exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user._id }); // Solo metas del usuario autenticado
    res.status(200).json(goals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────
// GET /api/goals/:id - Obtener una meta por ID
// ─────────────────────────────────────────────────────────────
exports.getGoalById = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: "Goal not found" });
    res.status(200).json(goal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────
// POST /api/goals - Crear una nueva meta
// ─────────────────────────────────────────────────────────────
exports.createGoal = async (req, res) => {
  const { title, description, deadline } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const newGoal = new Goal({
      userId: req.user._id, // ✅ Asociar automáticamente al usuario autenticado
      title,
      description,
      deadline,
      completed: false,
    });

    const savedGoal = await newGoal.save();
    res.status(201).json(savedGoal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────
// PUT /api/goals/:id - Actualizar una meta existente
// ─────────────────────────────────────────────────────────────
exports.updateGoal = async (req, res) => {
  try {
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedGoal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    res.status(200).json(updatedGoal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────
// DELETE /api/goals/:id - Eliminar una meta
// ─────────────────────────────────────────────────────────────
exports.deleteGoal = async (req, res) => {
  try {
    const deleted = await Goal.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Goal not found" });

    res.status(200).json({ message: "Goal deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
