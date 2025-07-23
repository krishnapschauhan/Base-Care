import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import Header from "@/components/Header";

// ✅ Define the Report type
type Report = {
  id: number;
  description: string;
  location: string;
  category: string;
  landmark: string;
  urgency: string;
  status: string;
  created_at: string;
};

const UserDashboard = () => {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Electrical");
  const [landmark, setLandmark] = useState("");
  const [urgency, setUrgency] = useState("Normal");
  const [reports, setReports] = useState<Report[]>([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get(`/reports/user/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(res.data);
    } catch (err) {
      console.error("Failed to fetch reports", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/reports",
        {
          description: description.trim(),
          location: location.trim(),
          category: category?.trim() || "N/A",
          landmark: landmark?.trim() || "N/A",
          urgency: urgency?.trim() || "Low",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Report submitted successfully");

      // Reset form
      setDescription("");
      setLocation("");
      setCategory("Electrical");
      setLandmark("");
      setUrgency("Normal");

      fetchReports();
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        // Type assertion to access response.data safely
        const axiosErr = err as { response?: { data?: { message?: string } } };
        alert(axiosErr.response?.data?.message || "Failed to submit report");
      } else {
        alert("Failed to submit report");
      }
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const pendingReports = reports.filter((r) => r.status !== "completed");
  const completedReports = reports.filter((r) => r.status === "completed");

  return (
    <div className="min-h-screen bg-[url('/heroimage.jpg')] bg-cover bg-center bg-no-repeat">
      <Header />

      <div className="min-h-screen bg-black/30 backdrop-brightness-90 p-6">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome to Your Dashboard
          </h1>
          <p className="text-indigo-100 text-lg">
            Submit issues and track progress in real time.
          </p>
        </motion.div>

        {/* ✅ Complaint Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-10"
        >
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">
            Submit a Complaint
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Category</label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Electrical">Electrical</option>
                <option value="Water">Water Leakage</option>
                <option value="Roads">Roads</option>
                <option value="Sanitation">Sanitation</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Description</label>
              <textarea
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Location</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Nearby Landmark</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Urgency</label>
              <div className="flex gap-4">
                {["Urgent", "Moderate", "Normal"].map((level) => (
                  <label key={level} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="urgency"
                      value={level}
                      checked={urgency === level}
                      onChange={() => setUrgency(level)}
                      className="accent-blue-600"
                    />
                    {level}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Submit Complaint
            </button>
          </form>
        </motion.div>

        {/* ✅ Pending Complaints */}
        <div className="mb-8">
          <h2 className="text-xl text-white font-semibold mb-4">
            🚧 Pending Complaints
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {pendingReports.map((report) => (
              <motion.div
                key={report.id}
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 180 }}
                className="bg-white/90 backdrop-blur-lg shadow-lg rounded-xl p-5 border border-gray-200"
              >
                <h3 className="text-xl font-bold text-blue-700 mb-2">
                  #{report.id}
                </h3>
                <p className="text-gray-700 mb-1">
                  <strong>Category:</strong> {report.category}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Description:</strong> {report.description}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Location:</strong> {report.location}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Landmark:</strong> {report.landmark}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Urgency:</strong> {report.urgency}
                </p>
                <p className="mt-2">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-white text-xs font-medium ${
                      report.status === "pending"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                  >
                    {report.status.toUpperCase()}
                  </span>
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Submitted: {new Date(report.created_at).toLocaleString()}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ✅ Completed Complaints */}
        <div>
          <h2 className="text-xl text-white font-semibold mb-4">
            ✅ Completed Complaints
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {completedReports.map((report) => (
              <motion.div
                key={report.id}
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 180 }}
                className="bg-white/90 backdrop-blur-lg shadow-lg rounded-xl p-5 border border-gray-200"
              >
                <h3 className="text-xl font-bold text-green-700 mb-2">
                  #{report.id}
                </h3>
                <p className="text-gray-700 mb-1">
                  <strong>Category:</strong> {report.category}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Description:</strong> {report.description}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Location:</strong> {report.location}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Landmark:</strong> {report.landmark}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Urgency:</strong> {report.urgency}
                </p>
                <p className="mt-2">
                  <span className="inline-block px-3 py-1 rounded-full text-white text-xs font-medium bg-green-600">
                    COMPLETED
                  </span>
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Submitted: {new Date(report.created_at).toLocaleString()}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;