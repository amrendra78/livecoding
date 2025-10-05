require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const serverless = require('serverless-http');

const app = express();
app.use(express.json());

// ----------------- CORS -----------------
// FRONTEND_URL can be a comma-separated list of allowed origins
const rawFrontend = process.env.FRONTEND_URL || 'http://localhost:4200';
const frontendList = rawFrontend.split(',').map(s => s.trim()).filter(Boolean);

const allowedOriginsSet = new Set([
  ...frontendList,
  'http://localhost:4200',
  'http://127.0.0.1:4200'
]);

const corsOptions = {
  origin: function (origin, callback) {
    // No origin (e.g., curl, server-to-server requests) — allow
    if (!origin) return callback(null, true);
    if (allowedOriginsSet.has(origin)) {
      return callback(null, true);
    }
    console.warn('❌ Blocked by CORS, origin not allowed:', origin);
    return callback(new Error('CORS policy does not allow access from this origin.'), false);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

console.log('Allowed CORS origins:', Array.from(allowedOriginsSet).join(', '));
app.use(cors(corsOptions));
// Ensure preflight requests are handled
app.options('*', cors(corsOptions));

// ---------------- MongoDB Connection -----------------
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error('❌ ERROR: MONGO_URI not set in environment variables');
} else {
  mongoose.connect(mongoURI, { keepAlive: true })
    .then(() => console.log('✅ MongoDB connected!'))
    .catch(err => console.error('❌ MongoDB connection error:', err));
}

// ---------------- User Model -----------------
const User = require('./user');

// ---------------- API Test Routes -----------------
app.get('/', (req, res) => res.send('Backend is running!'));
app.get('/api', (req, res) => res.send('API is working! Use /signup or /login'));
app.get('/api/hello', (req, res) => res.json({ message: 'Hello from backend!' }));

// ---------------- Auth / Signup -----------------
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.json({ success: true, message: `User ${name} signed up successfully!` });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------- Auth / Login -----------------
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid password" });

    res.json({ success: true, message: "Login successful", user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------- Serverless Export -----------------
module.exports = app;
module.exports.handler = serverless(app);

// ---------------- Local Testing -----------------
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
}
