const db = require("../config/mydb");

// Assign a worker to a report
const assignTask = async (reportId, workerId) => {
  const res = await db.query(
    `UPDATE reports SET assigned_to = $1, status = 'assigned' WHERE id = $2 RETURNING *`,
    [workerId, reportId]
  );
  return res;
};

// Get assigned report for a worker
const getTaskByWorkerId = async (workerId) => {
  const res = await db.query(
    `SELECT * FROM reports WHERE assigned_to = $1 AND status != 'completed' ORDER BY created_at DESC LIMIT 1`,
    [workerId]
  );
  return res;
};

// Update report status
const updateTaskStatus = async (reportId, status) => {
  const res = await db.query(
    `UPDATE reports SET status = $1 WHERE id = $2 RETURNING *`,
    [status, reportId]
  );
  return res;
};

module.exports = {
  assignTask,
  getTaskByWorkerId,
  updateTaskStatus,
};
