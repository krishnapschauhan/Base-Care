const db = require("../config/mydb");

// ✅ Get all workers (role = 'worker') – for assigning tasks
const getAllWorkers = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, name, email FROM users WHERE role = 'worker'"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching workers:", err);
    res.status(500).json({ message: "Failed to fetch workers" });
  }
};

// ✅ Get all reports (with user and worker names)
const getAllReports = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        r.*, 
        u.name AS username, 
        w.name AS workername
      FROM reports r
      LEFT JOIN users u ON r.user_id = u.id
      LEFT JOIN users w ON r.assigned_to = w.id
      ORDER BY r.created_at DESC
    `);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching reports:", err);
    res.status(500).json({ message: "Failed to fetch reports" });
  }
};

// ✅ Get all users (optional, if needed)
const getAllUsers = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, name, email FROM users WHERE role = 'user'"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

module.exports = {
  getAllWorkers,
  getAllReports,
  getAllUsers, // optional
};
