const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



// Register User
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if all fields are present
    if (!name || !email || !password || !subject || !qualification) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: hashedPassword, subject, qualification });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
  
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if all fields are present
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(200).json({ result: user, token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//fetch user details
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('name subject qualification');
    res.json(users);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching profile' });
  }
};

//edit user profile
exports.updateProfile = async (req, res) => {
  const { name, subject, qualification } = req.body;
  const user = await User.findById(req.user.id);
  user.name = name;
  user.subject = subject;
  user.qualification = qualification;
  await user.save();
  res.json({ message: 'Profile updated successfully' });
};
