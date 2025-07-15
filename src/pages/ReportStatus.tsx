import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "@/lib/api";
import Header from "@/components/Header";

type Report = {
  id: number;
  location: string;
  description: string;
  status: string;
  created_at: string;
};

const ReportStatuss = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token || !user.id) {
        navigate("/login/user");
        return;
      }

      const res = await api.get(`/reports/user/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReports(res.data);
    } catch (err) {
      console.error("Failed to fetch status reports:", err);
      alert("Please login to view your report status.");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const pending = reports.filter((r: Report) => r.status !== "completed");
  const completed = reports.filter((r: Report) => r.status === "completed");

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[url('/heroimage.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="min-h-screen bg-black/30 backdrop-brightness-90 p-6">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <h1 className="text-4xl font-bold text-center text-white mb-10">
              📋 Your Complaint Status
            </h1>

            {/* 🚧 Pending Section */}
            <h2 className="text-2xl text-yellow-300 font-semibold mb-4">
              🚧 Pending / Assigned Complaints
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {pending.length === 0 ? (
                <p className="text-white text-lg col-span-full italic">
                  No active complaints right now.
                </p>
              ) : (
                pending.map((report: Report) => (
                  <motion.div
                    key={report.id}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-white/90 backdrop-blur-lg p-5 rounded-xl shadow-md border border-gray-200"
                  >
                    <h3 className="text-xl font-bold text-blue-800 mb-2">#{report.id}</h3>
                    <p><strong>📍 Location:</strong> {report.location}</p>
                    <p><strong>📝 Description:</strong> {report.description}</p>
                    <p className="mt-2">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-xs font-medium ${
                          report.status === "assigned"
                            ? "bg-blue-600"
                            : "bg-yellow-500"
                        }`}
                      >
                        {report.status.toUpperCase()}
                      </span>
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Submitted: {new Date(report.created_at).toLocaleString()}
                    </p>
                  </motion.div>
                ))
              )}
            </div>

            {/* ✅ Completed Section */}
            <h2 className="text-2xl text-green-400 font-semibold mb-4">
              ✅ Completed Complaints
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {completed.length === 0 ? (
                <p className="text-white text-lg col-span-full italic">
                  No completed complaints yet.
                </p>
              ) : (
                completed.map((report: Report) => (
                  <motion.div
                    key={report.id}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-white/90 backdrop-blur-lg p-5 rounded-xl shadow-md border border-gray-200"
                  >
                    <h3 className="text-xl font-bold text-green-700 mb-2">#{report.id}</h3>
                    <p><strong>📍 Location:</strong> {report.location}</p>
                    <p><strong>📝 Description:</strong> {report.description}</p>
                    <p className="mt-2">
                      <span className="px-3 py-1 rounded-full text-white text-xs font-medium bg-green-600">
                        COMPLETED
                      </span>
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Submitted: {new Date(report.created_at).toLocaleString()}
                    </p>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ReportStatuss;
