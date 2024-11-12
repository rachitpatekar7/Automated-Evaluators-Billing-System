const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  examID: {
    type: String,
    required: true,
    unique: true
  },
  examType: { 
    type: String, 
    required: true 
  },
  examiner: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  }
});

module.exports = mongoose.model('Exam', examSchema);
