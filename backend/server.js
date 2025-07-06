const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env
dotenv.config();

// ✅ Import route files
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const reportRoutes = require("./routes/reportRoutes");
const workerRoutes = require("./routes/workerRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// ✅ Global Middleware
app.use(cors());               // Allow cross-origin requests
app.use(express.json());       // Enable JSON request body parsing

// ✅ API Route Mappings
app.use("/api/auth", authRoutes);         // Login / Registration
app.use("/api/admin", adminRoutes);       // Admin-related endpoints
app.use("/api/reports", reportRoutes);    // Report/Complaint endpoints
app.use("/api/worker", workerRoutes);     // Worker dashboard/task list
app.use("/api/tasks", taskRoutes);        // Task management (assign/update)

// ✅ Health Check (Optional)
app.get("/", (req, res) => {
  res.send("✅ Urban Alert Backend is running...");
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
