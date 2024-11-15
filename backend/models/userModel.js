const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  subject: { 
    type: String, 
    required: true 
  },
  qualification: { 
    type: String, 
    required: true 
  }
});

module.exports = mongoose.model('User', userSchema);
