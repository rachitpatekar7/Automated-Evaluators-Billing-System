const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
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
  }
});

module.exports = mongoose.model('Billing', billingSchema);
