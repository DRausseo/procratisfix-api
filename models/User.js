const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  avatar: { type: String },
  googleId: { type: String }, // Para OAuth con Google
  createdAt: { type: Date, default: Date.now },
  preferences: {
    reminderTime: { type: String, default: '08:00' },
    theme: { type: String, default: 'light' }
  }
});

module.exports = mongoose.model('User', userSchema);
