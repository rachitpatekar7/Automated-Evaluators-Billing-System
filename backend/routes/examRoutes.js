const express = require('express');
const { createExam, getExams, updateExam } = require('../controllers/examController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Route to create a new exam record
router.post('/create', createExam);

//Route to edit the exam
router.put('/edit/:id', authMiddleware, updateExam);

// Get all exams
router.get('/all', getExams);

module.exports = router;
