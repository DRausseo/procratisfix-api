const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  goalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal', required: true },
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  dueDate: { type: Date }
});

module.exports = mongoose.model('Task', taskSchema);
