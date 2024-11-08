const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  examID: { 
    type: String, 
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
  hoursWorked: { 
    type: Number, 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  pdfData: { 
    type: Buffer 
  } // Field to store PDF data
});

module.exports = mongoose.model('Billing', billingSchema);
