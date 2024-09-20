const express = require('express');
const { generateBillingReceipt } = require('../controllers/billingController');

const router = express.Router();

// Route to generate a billing receipt
router.post('/generate', generateBillingReceipt);

module.exports = router;
