const db = require("../config/mydb");
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
    console.error("❌ Complete error:", err);
    res.status(500).json({ message: "❌ Failed to update report status" });
  }
};

// ✅ Update worker availability
exports.updateAvailability = async (req, res) => {
  const { availability } = req.body;
  const workerId = req.user.id;

  try {
    await db.query(
      "UPDATE users SET availability = $1 WHERE id = $2 AND role = 'worker'",
      [availability, workerId]
    );
    res.status(200).json({ message: "✅ Availability updated" });
  } catch (err) {
    console.error("❌ Availability update error:", err);
    res.status(500).json({ message: "❌ Failed to update availability" });
  }
};
