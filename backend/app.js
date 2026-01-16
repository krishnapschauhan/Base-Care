const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// ✅ LOAD ENV FIRST (THIS IS CRITICAL)
dotenv.config({ path: path.join(__dirname, ".env") });

// ✅ THEN import db & everything else
const db = require("./config/mydb");

// Import routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const reportRoutes = require("./routes/reportRoutes");
const workerRoutes = require("./routes/workerRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/worker", workerRoutes);
app.use("/api/tasks", taskRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

module.exports = app;
