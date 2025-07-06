const taskModel = require('../models/taskModel');

// ✅ Assign a task (admin → assign report to a worker)
exports.assignTask = async (req, res) => {
  const { reportId, workerId } = req.body;

  try {
    const result = await taskModel.assignTask(reportId, workerId);
    res.status(201).json({
      message: "Task assigned successfully",
      report: result.rows[0]
    });
  } catch (err) {
    console.error("Assign Task Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get current task assigned to a worker
exports.getWorkerTask = async (req, res) => {
  const workerId = req.params.workerId;

  try {
    const result = await taskModel.getTaskByWorkerId(workerId);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No task assigned to this worker" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Get Worker Task Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Worker updates task status
exports.updateTaskStatus = async (req, res) => {
  const { reportId, status } = req.body;

  try {
    const result = await taskModel.updateTaskStatus(reportId, status);
    res.json({
      message: "Task status updated",
      report: result.rows[0]
    });
  } catch (err) {
    console.error("Update Task Status Error:", err);
    res.status(500).json({ error: err.message });
  }
};
