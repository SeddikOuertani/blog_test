const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


mongoose
  .connect(MONGO_URI, {
    dbName: process.env.MONGO_DB || undefined
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

  
// --- Import Routes ---
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const articleRoutes = require('./routes/article');
const commentRoutes = require('./routes/comment');

// --- Use Routes ---
app.use('/api/auth', authRoutes);        // e.g., /api/auth/register, /api/auth/login
app.use('/api/articles', articleRoutes); // e.g., /api/articles/, /api/articles/:id
app.use('/api/comments', commentRoutes);

// --- 404 Handler ---
// app.use((req, res) => res.status(404).json({ message: 'Not Found' }));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});