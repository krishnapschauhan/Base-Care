const express = require("express");
const router = express.Router();

// Controllers
const {
  getAllUsers,
  getAllReports,
  getAllWorkers, 
} = require("../controllers/adminController");

// Middleware
const { verifyToken, authorizeRole } = require("../middleware/authMiddleware");

// ✅ GET /api/admin/users - Admin-only: Fetch all regular users
router.get("/users", verifyToken, authorizeRole("admin"), getAllUsers);

// ✅ GET /api/admin/workers - Admin-only: Fetch all workers (for task assignment)
router.get("/workers", verifyToken, authorizeRole("admin"), getAllWorkers);

// ✅ GET /api/admin/reports - Admin-only: Fetch all submitted reports
router.get("/reports", verifyToken, authorizeRole("admin"), getAllReports);

module.exports = router;