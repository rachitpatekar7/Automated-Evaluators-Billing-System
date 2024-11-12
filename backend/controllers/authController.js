const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

console.log(process.env.JWT_SECRET);

// Register User
exports.register = async (req, res) => {
  const { name, email, password, subject, qualification } = req.body;

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

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//fetch user details
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('name email subject qualification');
    res.json(users);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching profile' });
  }
};

//edit user profile
exports.updateProfile = async (req, res) => {
  const { name, subject, qualification } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name;
    user.subject = subject;
    user.qualification = qualification;
    await user.save();

    res.json(user); // Send updated user back to the frontend
  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }
};

//Fetch user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('name'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
};
