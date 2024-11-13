const express = require('express');
const { createExam, getExams, updateExam, getAllExams } = require('../controllers/examController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Route to create a new exam record
router.post('/create', createExam);

//Route to edit the exam
router.put('/edit/:id', authMiddleware, updateExam);

// Get all exams
router.get('/all', getExams);

// Get all exams for billing, filtered by logged-in user (requires authentication)
router.get('/all-exams', authMiddleware, getAllExams); 

module.exports = router;
