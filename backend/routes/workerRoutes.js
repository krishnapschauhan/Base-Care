const express = require("express");
const router = express.Router();
const { verifyToken, authorizeRole } = require("../middleware/authMiddleware");
const { markReportCompleted, updateAvailability } = require("../controllers/workerController");
const db = require("../config/mydb");

// ✅ Fetch all reports assigned to the logged-in worker
router.get("/tasks", verifyToken, authorizeRole("worker"), async (req, res) => {
  try {
    const result = await db.query(
      `
      SELECT 
        r.*, 
        u.name AS reported_by 
      FROM reports r
      LEFT JOIN users u ON r.user_id = u.id
      WHERE r.assigned_to = $1
      ORDER BY r.created_at DESC
      `,
      [req.user.id]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching worker tasks:", err);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

// ✅ Mark report as completed
router.put("/report/:id/complete", verifyToken, authorizeRole("worker"), markReportCompleted);

// ✅ Update availability status
router.patch("/availability", verifyToken, authorizeRole("worker"), updateAvailability);

module.exports = router;
