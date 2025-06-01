const mongoose = require('mongoose');

const routineSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['morning', 'afternoon', 'evening'], required: true },
  activities: [String],
  startTime: { type: String } // e.g. "07:30"
});

module.exports = mongoose.model('Routine', routineSchema);
