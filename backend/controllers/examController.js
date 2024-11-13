const Exam = require('../models/examModel');

// Create Exam Record
exports.createExam = async (req, res) => {
  const { examID, examType, examiner, date } = req.body;

  try {
    // Check if all fields are provided
    if (!examID || !examType || !examiner || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for unique examID
    const existingExam = await Exam.findOne({ examID });
    if (existingExam) {
      return res.status(400).json({ message: "Exam ID already exists. Please use a different ID." });
    }

    // Create new exam
    const newExam = new Exam({ examID, examType, examiner, date });
    await newExam.save();

    res.status(201).json({ message: "Exam created successfully", newExam });
  } catch (error) {
    console.error('Error creating exam:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Exam Records
exports.getExams = async (req, res) => {
  //const { userId } = req.params;
  try {
    const exams = await Exam.find();
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//update exam records
exports.updateExam = async (req, res) => {
  const { id } = req.params;
  const { examType, examiner, date } = req.body;
  const exam = await Exam.findById(id);
  
  exam.examType = examType;
  exam.examiner = examiner;
  exam.date = date;
  await exam.save();
  res.json({ message: 'Exam updated successfully' });
};

//fetch exam for billing  
exports.getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find({}, 'examID examType examiner'); // Fetch necessary fields
    res.status(200).json(exams);
  } catch (error) {
    console.error("Error fetching exams:", error);
    res.status(500).json({ message: "Failed to fetch exams" });
  }
};
