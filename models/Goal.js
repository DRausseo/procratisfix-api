const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  deadline: { type: Date },
  completed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Goal', goalSchema);
