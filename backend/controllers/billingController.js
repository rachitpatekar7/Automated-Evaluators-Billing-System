const PDFDocument = require('pdfkit');
const Billing = require('../models/billingModel');
const fs = require('fs');

// Generate PDF Receipt
exports.generateBillingReceipt = async (req, res) => {
  const { userId, examType, examiner, hoursWorked, amount } = req.body;

  try {
    const newBilling = new Billing({
      userId,
      examType,
      examiner,
      hoursWorked,
      amount
    });

    await newBilling.save();

    // Create a PDF document
    const doc = new PDFDocument();
    const filePath = `./receipts/${userId}-${Date.now()}.pdf`;

    doc.pipe(fs.createWriteStream(filePath));
    doc.fontSize(25).text('Billing Receipt', { align: 'center' });
    doc.moveDown();
    doc.fontSize(16).text(`Exam Type: ${examType}`);
    doc.text(`Examiner: ${examiner}`);
    doc.text(`Hours Worked: ${hoursWorked}`);
    doc.text(`Amount: ${amount}`);
    doc.end();

    res.status(200).json({ message: "Billing receipt generated", filePath });
  } catch (error) {
    res.status(500).json({ message: "Error generating receipt" });
  }
};
