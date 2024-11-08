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

//update exam records
exports.updateExam = async (req, res) => {
  const { id } = req.params;
  const { examType, examiner, date } = req.body;
  const exam = await Exam.findById(id);

  if (exam.status === 'conducted') {
    return res.status(403).json({ message: 'Cannot edit a conducted exam' });
  }
  
  exam.examType = examType;
  exam.examiner = examiner;
  exam.date = date;
  await exam.save();
  res.json({ message: 'Exam updated successfully' });
};

//mark exam conducted
exports.markExamConducted = async (req, res) => {
  const { id } = req.params;
  const exam = await Exam.findById(id);

  if (!exam) return res.status(404).json({ message: 'Exam not found' });

  exam.status = 'conducted';
  await exam.save();
  res.json({ message: 'Exam marked as conducted' });
};

