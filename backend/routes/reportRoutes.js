const express = require("express");
const router = express.Router();
const {
  submitReport,
  getUserReports,
  assignWorker,
  updateReportStatus,
} = require("../models/reportModel");

const { verifyToken, authorizeRole } = require("../middleware/authMiddleware");

// ✅ Submit a new report (User only)
router.post("/", verifyToken, authorizeRole("user"), async (req, res) => {
  try {
    const { description, location } = req.body;
    const image_path = null;

    const report = await submitReport(req.user.id, description, image_path, location);
    res.status(201).json({ message: "Report submitted", report });
  } catch (err) {
    console.error("Submit report error:", err);
    res.status(500).json({ error: "Failed to submit report" });
  }
});

// ✅ Get all reports submitted by the user
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

// ✅ Admin assigns a report to a worker
router.post("/assign", verifyToken, authorizeRole("admin"), async (req, res) => {
  try {
    const { reportId, workerId } = req.body;
    const updated = await assignWorker(reportId, workerId);
    res.status(200).json({ message: "Report assigned", report: updated });
  } catch (err) {
    console.error("Assign worker error:", err);
    res.status(500).json({ message: "Failed to assign worker" });
  }
});

// ✅ Worker marks report as completed
router.put("/:id/complete", verifyToken, authorizeRole("worker"), async (req, res) => {
  try {
    const reportId = parseInt(req.params.id);
    if (isNaN(reportId)) {
      return res.status(400).json({ message: "Invalid report ID" });
    }

    const updated = await updateReportStatus(reportId, "completed");
    res.status(200).json({
      message: "✅ Report marked as completed",
      report: updated,
    });
  } catch (err) {
    console.error("Complete error:", err);
    res.status(500).json({ message: "❌ Failed to update report status", error: err.message });
  }
});


module.exports = router;
