const db = require('../config/mydb');


const assignWorker = async (workerId, reportId) => {
  await pool.query('UPDATE reports SET assigned_worker_id = $1, status = $2 WHERE id = $3', [
    workerId,
    'Assigned',
    reportId,
  ]);

  await pool.query('UPDATE workers SET is_available = false WHERE id = $1', [workerId]);
};

const updateReportStatus = async (reportId, status) => {
  await pool.query('UPDATE reports SET status = $1 WHERE id = $2', [status, reportId]);
};

module.exports = { assignWorker, updateReportStatus };
