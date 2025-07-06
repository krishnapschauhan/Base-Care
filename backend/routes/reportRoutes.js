const express = require("express");
const router = express.Router();

const {
  submitReport,
  getUserReports,
  assignWorker,
  updateReportStatus,
} = require("../models/reportModel");

const { verifyToken, authorizeRole } = require("../middleware/authMiddleware");

// ✅ POST /api/reports - User submits a new report
router.post("/", verifyToken, authorizeRole("user"), async (req, res) => {
  try {
    const { description, location } = req.body;

    if (!description || !location) {
      return res.status(400).json({ message: "Description and location are required." });
    }

    const report = await submitReport(req.user.id, description, location);
    res.status(201).json({ message: "Report submitted", report });
  } catch (err) {
    console.error("Submit report error:", err);
    res.status(500).json({ error: err.message || "Failed to submit report" });
  }
});

// ✅ GET /api/reports/user/:id - Get all reports submitted by a user
router.get("/user/:id", verifyToken, authorizeRole("user"), async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    if (req.user.id !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const reports = await getUserReports(userId);
    res.json(reports);
  } catch (err) {
    console.error("Get reports error:", err);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

// ✅ POST /api/reports/assign - Admin assigns a report to a worker
router.post("/assign", verifyToken, authorizeRole("admin"), async (req, res) => {
  try {
    const { reportId, workerId } = req.body;

    if (!reportId || !workerId) {
      return res.status(400).json({ message: "Report ID and Worker ID are required." });
    }

    const updated = await assignWorker(reportId, workerId);
    res.status(200).json({ message: "Report assigned", report: updated });
  } catch (err) {
    console.error("Assign worker error:", err);
    res.status(500).json({ message: "Failed to assign worker", error: err.message });
  }
});

// ✅ PUT /api/reports/:id/complete - Worker marks a report as completed
router.put("/:id/complete", verifyToken, authorizeRole("worker"), async (req, res) => {
  try {
    const reportId = parseInt(req.params.id);

    if (isNaN(reportId)) {
      return res.status(400).json({ message: "Invalid report ID" });
    }

    const updated = await updateReportStatus(reportId, "completed");
    res.status(200).json({ message: "✅ Report marked as completed", report: updated });
  } catch (err) {
    console.error("Complete error:", err);
    res.status(500).json({ message: "❌ Failed to update report status", error: err.message });
  }
});

module.exports = router;
