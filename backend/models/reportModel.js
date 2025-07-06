const db = require("../config/mydb");

// ✅ Create/Submit a new report
const submitReport = async (user_id, description, location) => {
  const res = await db.query(
    `INSERT INTO reports (user_id, description, status, location)
     VALUES ($1, $2, 'pending', $3) RETURNING *`,
    [user_id, description, location]
  );
  return res.rows[0];
};

// ✅ Get all reports submitted by a user
const getUserReports = async (user_id) => {
  const res = await db.query(
    "SELECT * FROM reports WHERE user_id = $1 ORDER BY created_at DESC",
    [user_id]
  );
  return res.rows;
};

// ✅ Get all reports assigned to a specific worker
const getAssignedReports = async (worker_id) => {
  const res = await db.query(
    "SELECT * FROM reports WHERE assigned_to = $1 ORDER BY created_at DESC",
    [worker_id]
  );
  return res.rows;
};

// ✅ Admin: Assign a report to a worker
const assignWorker = async (report_id, worker_id) => {
  const res = await db.query(
    `UPDATE reports SET assigned_to = $1, status = 'assigned' WHERE id = $2 RETURNING *`,
    [worker_id, report_id]
  );
  return res.rows[0];
};

// ✅ Worker/Admin: Update report status (e.g., mark as completed)
const updateReportStatus = async (report_id, status) => {
  const res = await db.query(
    `UPDATE reports SET status = $1 WHERE id = $2 RETURNING *`,
    [status, report_id]
  );
  return res.rows[0];
};

// ✅ Admin: View all reports with user and worker names
const getAllReports = async () => {
  const res = await db.query(
    `SELECT r.*, u.name AS username, w.name AS workername
     FROM reports r
     LEFT JOIN users u ON r.user_id = u.id
     LEFT JOIN users w ON r.assigned_to = w.id
     ORDER BY r.created_at DESC`
  );
  return res.rows;
};

module.exports = {
  submitReport,
  getUserReports,
  getAssignedReports,
  assignWorker,
  updateReportStatus,
  getAllReports,
};
