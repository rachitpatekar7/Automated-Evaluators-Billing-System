const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const examSchema = new mongoose.Schema({
  examID: { 
    type: String, 
    default: uuidv4, unique: true 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
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
  },
  status: { 
    type: String, 
    default: 'pending' 
  }
});

module.exports = mongoose.model('Exam', examSchema);
