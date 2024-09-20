const Exam = require('../models/examModel');

// Create Exam Record
exports.createExam = async (req, res) => {
  const { userId, examType, examiner, date } = req.body;

  try {
    const newExam = new Exam({
      userId,
      examType,
      examiner,
      date
    });

    await newExam.save();
    res.status(201).json({ message: "Exam created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get Exam Records
exports.getExams = async (req, res) => {
  try {
    const exams = await Exam.find({ userId: req.user.id });
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
