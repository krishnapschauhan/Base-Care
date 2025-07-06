const express = require("express");
const router = express.Router();

const {
  assignTask,
  getTaskByWorkerId,
  updateTaskStatus,
} = require("../models/taskModel");

const { verifyToken, authorizeRole } = require("../middleware/authMiddleware");

// ✅ POST /api/tasks/assign — Admin assigns task to worker
router.post("/assign", verifyToken, authorizeRole("admin"), async (req, res) => {
  const { reportId, workerId } = req.body;

  if (!reportId || !workerId) {
    return res.status(400).json({ error: "reportId and workerId are required" });
  }

  try {
    const result = await assignTask(reportId, workerId);
    res.status(201).json({ message: "Task assigned", report: result.rows[0] });
  } catch (err) {
    console.error("Assign task error:", err);
    res.status(500).json({ error: "Failed to assign task" });
  }
});

// ✅ GET /api/tasks/worker — Worker fetches their assigned task
router.get("/worker", verifyToken, authorizeRole("worker"), async (req, res) => {
  try {
    const workerId = req.user.id;
    const result = await getTaskByWorkerId(workerId);
    res.status(200).json(result.rows[0] || {});
  } catch (err) {
    console.error("Fetch task error:", err);
    res.status(500).json({ error: "Failed to fetch assigned task" });
  }
});

// ✅ PATCH /api/tasks/status — Worker updates task status
router.patch("/status", verifyToken, authorizeRole("worker"), async (req, res) => {
  const { reportId, status } = req.body;

  if (!reportId || !status) {
    return res.status(400).json({ error: "reportId and status are required" });
  }

  try {
    const result = await updateTaskStatus(reportId, status);
    res.status(200).json({ message: "Status updated", report: result.rows[0] });
  } catch (err) {
    console.error("Update status error:", err);
    res.status(500).json({ error: "Failed to update task status" });
  }
});

module.exports = router;
