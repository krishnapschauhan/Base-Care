const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByEmail, registerUser } = require("../models/userModel");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await findUserByEmail(email);
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await registerUser(name, email, hashed);

    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await findUserByEmail(email);
    if (!user || user.role !== role) {
      return res.status(401).json({ message: "Invalid credentials or role" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
