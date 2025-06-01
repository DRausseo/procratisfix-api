const Task = require("../models/Task");

// ─────────────────────────────────────────────
// GET /api/tasks - Obtener todas las tareas
// ─────────────────────────────────────────────
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────
// GET /api/tasks/:id - Obtener una tarea por ID
// ─────────────────────────────────────────────
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────
// POST /api/tasks - Crear una nueva tarea
// ─────────────────────────────────────────────
exports.createTask = async (req, res) => {
  const { goalId, title, completed, dueDate } = req.body;

  if (!title || !goalId) {
    return res.status(400).json({ message: "Title and goalId are required" });
  }

  try {
    const newTask = new Task({ goalId, title, completed, dueDate });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────
// PUT /api/tasks/:id - Actualizar una tarea
// ─────────────────────────────────────────────
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTask)
      return res.status(404).json({ message: "Task not found" });
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────
// DELETE /api/tasks/:id - Eliminar una tarea
// ─────────────────────────────────────────────
exports.deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
