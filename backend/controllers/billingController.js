const nodemailer = require('nodemailer');
const { jsPDF } = require('jspdf');
const Billing = require('../models/billingModel');
const Exam = require('../models/examModel');

exports.generateBillingReceipt = async (req, res) => {
  console.log('User in generateBillingReceipt:', req.user); 
  const { examID, hoursWorked } = req.body;
  const ratePerHour = 200;

  if (!examID || !hoursWorked) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const exam = await Exam.findOne({ examID }); // Fetch exam details
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    const amount = hoursWorked * ratePerHour;

    const newBilling = new Billing({
      examID,
      examType: exam.examType,
      examiner: exam.examiner,
      hoursWorked,
      amount
    });
    console.log("Billing record saved successfully.");

    // Generate PDF using jsPDF
    const doc = new jsPDF();

    doc.setFontSize(25);
    doc.text('Billing Receipt', 105, 20, { align: 'center' });
    doc.setFontSize(16);
    doc.text(`Exam ID: ${examID}`, 10, 40);
    doc.text(`Exam Type: ${exam.examType}`, 10, 50);
    doc.text(`Examiner: ${exam.examiner}`, 10, 60);
    doc.text(`Hours Worked: ${hoursWorked}`, 10, 70);
    doc.text(`Amount: $${amount}`, 10, 80);

    // Save PDF data as a buffer
    const pdfData = Buffer.from(doc.output('arraybuffer'));

    // Update the billing record with the PDF data
    newBilling.pdfData = Buffer.from(pdfData);
    await newBilling.save();

    /* Email the PDF as an attachment
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
    });*/

    // Send the PDF to the client for download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=BillingReceipt-${examID}.pdf`);
    res.send(pdfData);

  } catch (error) {
    console.error('Error generating receipt:', error);
    res.status(500).json({ message: 'Error generating receipt' });
  }
};

exports.getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find({}, 'examID examType examiner'); // Fetch all exams with specific fields
    res.status(200).json(exams);
  } catch (error) {
    console.error("Error fetching exams:", error);
    res.status(500).json({ message: "Failed to fetch exams" });
  }
};