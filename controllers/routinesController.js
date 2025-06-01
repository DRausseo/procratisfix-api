const Routine = require("../models/Routine");

// GET /api/routines
exports.getRoutines = async (req, res) => {
  try {
    const routines = await Routine.find();
    res.status(200).json(routines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/routines/:id
exports.getRoutineById = async (req, res) => {
  try {
    const routine = await Routine.findById(req.params.id);
    if (!routine) return res.status(404).json({ message: "Routine not found" });
    res.status(200).json(routine);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/routines
exports.createRoutine = async (req, res) => {
  const { userId, type, activities, startTime } = req.body;

  if (!type || !activities) {
    return res
      .status(400)
      .json({ message: "Type and activities are required" });
  }

  try {
    const newRoutine = new Routine({ userId, type, activities, startTime });
    const savedRoutine = await newRoutine.save();
    res.status(201).json(savedRoutine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/routines/:id
exports.updateRoutine = async (req, res) => {
  try {
    const updated = await Routine.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Routine not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/routines/:id
exports.deleteRoutine = async (req, res) => {
  try {
    const deleted = await Routine.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Routine not found" });
    res.status(200).json({ message: "Routine deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
