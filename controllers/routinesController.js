const Routine = require("../models/Routine");

// GET /api/routines
exports.getRoutines = async (req, res) => {
  try {
    const routines = await Routine.find({ userId: req.user._id });
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
  const { type, activities, startTime } = req.body;

  if (!type || !activities || !startTime) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const newRoutine = new Routine({
      userId: req.user._id,
      type,
      activities,
      startTime,
    });

    const savedRoutine = await newRoutine.save();
    res.status(201).json(savedRoutine);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/routines/:id
exports.updateRoutine = async (req, res) => {
  const { type, activities, startTime } = req.body;

  if (!type || !activities || !startTime) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const updatedRoutine = await Routine.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedRoutine) {
      return res.status(404).json({ message: "Routine not found" });
    }

    res.status(200).json(updatedRoutine);
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
