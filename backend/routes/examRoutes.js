const express = require('express');
const { createExam, getExams } = require('../controllers/examController');

const router = express.Router();

// Route to create a new exam record
router.post('/create', createExam);

// Route to get all exam records for a user
router.get('/user/:userId', getExams);

//Route to edit the exam
router.put('/edit/:id', authMiddleware, updateExam);

//Route to mark exam conducted
router.post('/mark-conducted/:id', authMiddleware, markExamConducted);

module.exports = router;
