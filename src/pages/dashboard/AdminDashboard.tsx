import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import Header from "@/components/Header";

const AdminDashboard = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [filteredReports, setFilteredReports] = useState<any[]>([]);
  const [workers, setWorkers] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);
  const [selectedWorkerId, setSelectedWorkerId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("pending");

  const navigate = useNavigate();

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/admin/reports", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(res.data);
      setFilteredReports(res.data);
    } catch (err) {
      console.error("Failed to fetch reports", err);
    }
  };

  const fetchWorkers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/admin/workers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWorkers(res.data);
    } catch (err) {
      console.error("Failed to fetch workers", err);
    }
  };

  const handleAssign = async () => {
    try {
      const confirm = window.confirm("Assign this report to the selected worker?");
      if (!confirm) return;

      const token = localStorage.getItem("token");
      if (!selectedReportId || !selectedWorkerId) {
        alert("Please select a worker.");
        return;
      }

      await api.post(
        "/reports/assign",
        { reportId: selectedReportId, workerId: selectedWorkerId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Task assigned successfully!");
      setShowModal(false);
      setSelectedWorkerId(null);
      setSelectedReportId(null);
      fetchReports();
    } catch (err) {
      alert("🚫 Assignment failed.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login/admin", { replace: true }); // ✅ Prevents back button return
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const filteredByTab = reports.filter((r) => {
    return activeTab === "all" || r.status === activeTab;
  });

  return (
    <>
      <Header onLogout={handleLogout} />

      <div className="min-h-screen bg-[url('/heroimage.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="min-h-screen bg-black/30 backdrop-brightness-90 p-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto"
          >
            <h1 className="text-4xl font-bold text-center text-white mb-8">
              Admin Dashboard
            </h1>

            {/* Filter Buttons */}
            <div className="flex justify-center gap-4 mb-8">
              {["pending", "assigned", "completed", "all"].map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveTab(status)}
                  className={`px-4 py-2 rounded-full font-semibold ${
                    activeTab === status
                      ? "bg-white text-black"
                      : "bg-gray-200 text-gray-600 hover:bg-white"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>

            {/* Report Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredByTab.map((report) => (
                <motion.div
                  key={report.id}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-white/90 backdrop-blur-lg p-5 rounded-2xl shadow-lg border border-gray-200"
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    Report #{report.id}
                  </h2>
                  <p className="text-gray-700 mb-1">
                    <strong>📌 Description:</strong> {report.description}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>📍 Location:</strong> {report.location}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>🏷 Category:</strong> {report.category || "N/A"}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>🧭 Landmark:</strong> {report.landmark || "N/A"}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>⚡ Urgency:</strong> {report.urgency || "Normal"}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>👷 Assigned To:</strong>{" "}
                    {report.workername || (
                      <span className="italic text-gray-400">Unassigned</span>
                    )}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>🕒 Submitted:</strong>{" "}
                    {new Date(report.created_at).toLocaleString()}
                  </p>
                  <p className="text-gray-700">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`px-2 py-1 rounded-full text-xs text-white ${
                        report.status === "pending"
                          ? "bg-yellow-500"
                          : report.status === "assigned"
                          ? "bg-blue-500"
                          : "bg-green-600"
                      }`}
                    >
                      {report.status.toUpperCase()}
                    </span>
                  </p>

                  {report.status !== "completed" && (
                    <button
                      onClick={() => {
                        setSelectedReportId(report.id);
                        setShowModal(true);
                        fetchWorkers();
                      }}
                      className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                    >
                      Assign to Worker
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Modal */}
            {showModal && (
              <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
                  <h3 className="text-xl font-bold mb-4 text-indigo-700">
                    Assign to Worker
                  </h3>
                  <select
                    onChange={(e) => setSelectedWorkerId(Number(e.target.value))}
                    className="w-full mb-4 px-3 py-2 border rounded-md"
                  >
                    <option value="">-- Choose a worker --</option>
                    {workers.map((worker) => (
                      <option key={worker.id} value={worker.id}>
                        {worker.name} ({worker.email})
                      </option>
                    ))}
                  </select>
                  <div className="flex justify-end space-x-3">
                    <button
                      className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
                      onClick={handleAssign}
                      disabled={!selectedWorkerId}
                    >
                      Assign
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
