const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const Billing = require('../models/billingModel');
const fs = require('fs');
const path = require('path');

exports.generateBillingReceipt = async (req, res) => {
  const { userId, examID, examType, examiner, hoursWorked } = req.body;
  const ratePerHour = 50; // Define a standard rate per hour
  const amount = hoursWorked * ratePerHour;

  try {
    // Create a new billing record
    const newBilling = new Billing({ userId, examID, examType, examiner, hoursWorked, amount });
    await newBilling.save();

    // Generate PDF
    const doc = new PDFDocument();
    const pdfBuffer = [];

    // Collect PDF data as it streams
    doc.on('data', (chunk) => pdfBuffer.push(chunk));
    doc.on('end', async () => {
      const pdfData = Buffer.concat(pdfBuffer);
      
      // Save PDF data to the billing record
      newBilling.pdfData = pdfData;
      await newBilling.save();

      // Email the PDF as an attachment
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: req.user.email,
        subject: 'Billing Receipt',
        text: 'Here is your billing receipt.',
        attachments: [{ filename: 'BillingReceipt.pdf', content: pdfData }],
      });

      // Send the PDF to the client for auto-download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=BillingReceipt-${examID}.pdf`);
      res.send(pdfData);
    });

    // Populate PDF content
    doc.fontSize(25).text('Billing Receipt', { align: 'center' });
    doc.moveDown();
    doc.fontSize(16).text(`Exam ID: ${examID}`);
    doc.text(`Exam Type: ${examType}`);
    doc.text(`Examiner: ${examiner}`);
    doc.text(`Hours Worked: ${hoursWorked}`);
    doc.text(`Amount: $${amount}`);
    doc.end();

  } catch (error) {
    console.error('Error generating receipt:', error);
    res.status(500).json({ message: 'Error generating receipt' });
  }
};
