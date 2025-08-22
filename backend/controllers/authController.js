/** @format */
const pool = require("../db");
const { hashPassword, comparePassword, generateToken } = require("../utils/auth");
const User = require("../models/user");

async function signup(req, res) {
  const { email, password, name, role } = req.body;

  try {
    const existing = await User.findByEmail(email);
    if (existing) return res.status(400).json({ error: "User already exists" });

    const hashed = await hashPassword(password);

    const user = await User.createUser({
      email,
      password: hashed,
      name,
      role: role || "student",
    });

    const token = generateToken({ id: user.id, role: user.role });

    res.status(201).json({ user, token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
}

async function signin(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Incorrect password" });

    const token = generateToken({ id: user.id, role: user.role });

    res.json({
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = { signup, signin };
