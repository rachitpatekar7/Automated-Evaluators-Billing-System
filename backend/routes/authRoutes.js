const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// Registration route
router.post('/register', register);

// Login route
router.post('/login', login);

//profile route
router.get('/profile', authMiddleware, getProfile);

//fetch profile route
router.get('/faculty', authMiddleware, getAllUsers);

//update profile route
router.put('/profile', authMiddleware, updateProfile);

module.exports = router;
