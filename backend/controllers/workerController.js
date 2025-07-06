const { updateReportStatus } = require("../models/reportModel");

// ✅ Mark a report as completed by the worker
exports.markReportCompleted = async (req, res) => {
  const reportId = req.params.id;

  try {
    const updated = await updateReportStatus(reportId, "completed");

    res.status(200).json({
      message: "✅ Report marked as completed",
      report: updated,
    });
  } catch (err) {
    console.error("Complete error:", err);
    res.status(500).json({ message: "❌ Failed to update report status" });
  }
};
