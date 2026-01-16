const db = require("../config/mydb");

const assignWorker = async (workerId, reportId) => {
  await db.query(
    `UPDATE reports 
     SET assigned_to = $1, status = 'assigned' 
     WHERE id = $2`,
    [workerId, reportId]
  );

  await db.query(
    `UPDATE users 
     SET availability = false 
     WHERE id = $1`,
    [workerId]
  );
};

const updateReportStatus = async (reportId, status) => {
  await db.query(
    `UPDATE reports 
     SET status = $1 
     WHERE id = $2`,
    [status, reportId]
  );
};

module.exports = { assignWorker, updateReportStatus };
