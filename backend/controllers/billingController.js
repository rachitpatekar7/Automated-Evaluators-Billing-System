const { jsPDF } = require('jspdf');
const Billing = require('../models/billingModel');
const Exam = require('../models/examModel');

exports.generateBillingReceipt = async (req, res) => {
  const { examID, hoursWorked } = req.body;
  const ratePerHour = 200;

  if (!examID || !hoursWorked) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const exam = await Exam.findOne({ examID });
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

    // Set up custom font and color for "BillEval" heading
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(34, 85, 122); // Teal color for the heading
    doc.text('BillEval', 105, 20, { align: 'center' });

    // Draw a line below the heading
    doc.setDrawColor(34, 85, 122); // Same color as heading
    doc.setLineWidth(1);
    doc.line(20, 25, 190, 25); // Line below the heading

    // Content styling
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0); // Reset text color to black
    doc.setFontSize(14);

    // Content layout
    const contentStartY = 40;
    const lineSpacing = 10;

    doc.text(`Exam ID: ${examID}`, 20, contentStartY);
    doc.text(`Exam Type: ${exam.examType}`, 20, contentStartY + lineSpacing);
    doc.text(`Examiner: ${exam.examiner}`, 20, contentStartY + lineSpacing * 2);
    doc.text(`Hours Worked: ${hoursWorked}`, 20, contentStartY + lineSpacing * 3);
    doc.text(`Amount: $${amount}`, 20, contentStartY + lineSpacing * 4);

    // Save PDF data as a buffer
    const pdfData = Buffer.from(doc.output('arraybuffer'));

    // Update the billing record with the PDF data
    newBilling.pdfData = pdfData;
    await newBilling.save();

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
    const exams = await Exam.find({}, 'examID examType examiner');
    res.status(200).json(exams);
  } catch (error) {
    console.error("Error fetching exams:", error);
    res.status(500).json({ message: "Failed to fetch exams" });
  }
};
