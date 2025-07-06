import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import Header from "@/components/Header"; // ✅ Correct Navbar import

const AdminDashboard = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [filteredReports, setFilteredReports] = useState<any[]>([]);
  const [workers, setWorkers] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);
  const [selectedWorkerId, setSelectedWorkerId] = useState<number | null>(null);

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

  const handleSearch = () => {
    const filtered = reports.filter((r) => {
      const matchesSearch = r.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === "all" || r.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
    setFilteredReports(filtered);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    const filtered = reports.filter(
      (r) =>
        (status === "all" || r.status === status) &&
        (r.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredReports(filtered);
  };

  const openAssignModal = (reportId: number) => {
    setSelectedReportId(reportId);
    setShowModal(true);
    fetchWorkers();
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

      alert("Task assigned successfully!");
      setShowModal(false);
      setSelectedWorkerId(null);
      setSelectedReportId(null);
      fetchReports();
    } catch (err) {
      alert("Assignment failed.");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Summary counts
  const total = reports.length;
  const assigned = reports.filter((r) => r.status === "assigned").length;
  const completed = reports.filter((r) => r.status === "completed").length;
  const pending = reports.filter((r) => r.status === "pending").length;

  return (
    <>
      {/* ✅ Navbar outside image wrapper */}
      <Header />

      <div className="min-h-screen bg-[url('/heroimage.jpg')] bg-cover bg-center bg-no-repeat">
            {/* ✅ Navbar/Header */}
         
      
            {/* ✅ Light transparent overlay */}
            <div className="min-h-screen bg-black/30 backdrop-brightness-90 p-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto"
          >
            <h1 className="text-4xl font-bold text-center text-white mb-10">
              Admin Dashboard
            </h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
              <div className="bg-white/80 rounded-lg shadow p-4 text-center">
                <p className="text-xl font-bold text-indigo-700">{total}</p>
                <p>Total Reports</p>
              </div>
              <div className="bg-white/80 rounded-lg shadow p-4 text-center">
                <p className="text-xl font-bold text-blue-600">{assigned}</p>
                <p>Assigned</p>
              </div>
              <div className="bg-white/80 rounded-lg shadow p-4 text-center">
                <p className="text-xl font-bold text-yellow-600">{pending}</p>
                <p>Pending</p>
              </div>
              <div className="bg-white/80 rounded-lg shadow p-4 text-center">
                <p className="text-xl font-bold text-green-600">{completed}</p>
                <p>Completed</p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <input
                type="text"
                placeholder="Search by description or location"
                className="w-full sm:w-2/3 px-4 py-2 rounded-md border border-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyUp={handleSearch}
              />
              <select
                value={selectedStatus}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="px-3 py-2 rounded-md border border-gray-300"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="assigned">Assigned</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Report Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports.map((report, index) => (
                <motion.div
                  key={report.id}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/90 backdrop-blur-lg p-5 rounded-2xl shadow-lg border border-gray-200"
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    Report #{report.id}
                  </h2>
                  <p className="text-gray-700 mb-1"><strong>📌 Description:</strong> {report.description}</p>
                  <p className="text-gray-700 mb-1"><strong>📍 Location:</strong> {report.location}</p>
                  <p className="text-gray-700 mb-1">
                    <strong>🕒 Status:</strong>{" "}
                    <span className={`px-2 py-1 rounded-full text-xs text-white ${
                      report.status === "pending"
                        ? "bg-yellow-500"
                        : report.status === "assigned"
                        ? "bg-blue-500"
                        : "bg-green-600"
                    }`}>
                      {report.status.toUpperCase()}
                    </span>
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>👷 Assigned To:</strong>{" "}
                    {report.workername || <span className="italic text-gray-400">Unassigned</span>}
                  </p>

                  {report.status !== "completed" && (
                    <button
                      onClick={() => openAssignModal(report.id)}
                      className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
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
                  <h3 className="text-xl font-bold mb-4 text-indigo-700">Assign to Worker</h3>
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
