const {
  submitReport,
  getUserReports,
  assignWorker,
  updateReportStatus,
  getAllReports,
} = require('../models/reportModel');

// ✅ Controller: Submit a report (for user)
exports.submitReport = async (req, res) => {
  try {
    const { description, location } = req.body;
    const userId = req.user.id;

    // ❌ No image support due to security policy
    const imagePath = null;

    const report = await submitReport(userId, description, imagePath, location);
    res.status(201).json({ message: "Report submitted successfully", report });
  } catch (err) {
    console.error("Submit Report Error:", err);
    res.status(500).json({ message: "Failed to submit report" });
  }
};

// ✅ Controller: Get all reports (admin only)
exports.getReports = async (req, res) => {
  try {
    const reports = await getAllReports();
    res.status(200).json(reports);
  } catch (err) {
    console.error("Fetch Reports Error:", err);
    res.status(500).json({ message: "Failed to fetch reports" });
  }
};

// ✅ Controller: Get user's own reports
exports.getUserReports = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    if (req.user.id !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const reports = await getUserReports(userId);
    res.status(200).json(reports);
  } catch (err) {
    console.error("User Reports Error:", err);
    res.status(500).json({ message: "Failed to fetch user reports" });
  }
};

// ✅ Controller: Admin assigns a task to worker
exports.assignTaskToWorker = async (req, res) => {
  try {
    const { reportId, workerId } = req.body;
    const updated = await assignWorker(reportId, workerId);
    res.status(200).json({ message: "Task assigned successfully", report: updated });
  } catch (err) {
    console.error("Assign Error:", err);
    res.status(500).json({ message: "Failed to assign task" });
  }
};

// ✅ Controller: Worker marks report as completed
exports.markAsCompleted = async (req, res) => {
  try {
    const reportId = parseInt(req.params.id);
    const updated = await updateReportStatus(reportId, "completed");
    res.status(200).json({ message: "Marked as completed", report: updated });
  } catch (err) {
    console.error("Complete Error:", err);
    res.status(500).json({ message: "Failed to update status" });
  }
};
