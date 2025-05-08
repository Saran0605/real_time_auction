import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../Models/user.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';

export const register = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Request body is missing" });
  }
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error('Register Error:', error); // Print full error for debugging
    // Optionally, send the error message for debugging (remove in production)
    res.status(500).json({ message: "Something went wrong on the server", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ token, user: { name: user.name, role: user.role } });
  } catch (err) {
    console.error('Login Error:', err); // Print full error for debugging
    res.status(500).json({ message: 'Server error', error: err.message }); // Include error message for debugging
  }
};
