import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import Header from "@/components/Header";

const WorkerDashboard = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"ongoing" | "completed">("ongoing");
  const [availability, setAvailability] = useState(true); // 👈 New: availability state
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  // 🔄 Fetch tasks
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/worker/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  // ✅ Mark a task as completed
  const markCompleted = async (reportId: number) => {
    try {
      const token = localStorage.getItem("token");
      await api.put(
        `/reports/${reportId}/complete`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Task marked as completed!");
      fetchTasks();
    } catch (err) {
      console.error("Failed to mark as completed:", err);
      alert("❌ Failed to mark as completed.");
    }
  };

  // ✅ Secure logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login/worker", { replace: true });
  };

  // 🔁 Filter tasks based on status
  const filteredTasks = tasks.filter((task: any) =>
    activeTab === "ongoing"
      ? task.assigned_to === user.id && task.status !== "completed"
      : task.assigned_to === user.id && task.status === "completed"
  );

  // 🔄 Fetch worker's availability from localStorage
  const fetchAvailability = () => {
    const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (typeof savedUser.availability === "boolean") {
      setAvailability(savedUser.availability);
    }
  };

  // ✅ Toggle availability and update backend + localStorage
  const toggleAvailability = async () => {
    try {
      const token = localStorage.getItem("token");
      const newStatus = !availability;

      await api.patch(
        "/worker/availability",
        { availability: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAvailability(newStatus);
      const updatedUser = { ...user, availability: newStatus };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error("Error updating availability:", err);
      alert("❌ Failed to update availability.");
    }
  };

  // 📦 Load data on mount
  useEffect(() => {
    fetchTasks();
    fetchAvailability();
  }, []);

  return (
    <>
      <Header onLogout={handleLogout} />

      <div className="min-h-screen bg-[url('/heroimage.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="min-h-screen bg-black/30 backdrop-brightness-90 p-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <h1 className="text-4xl font-bold text-yellow-700 text-center mb-6">
              Worker Dashboard
            </h1>

            {/* 🔘 Availability Toggle */}
            <div className="flex justify-center mb-4">
              <button
                onClick={toggleAvailability}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                  availability
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {availability ? "🟢 Available" : "🔴 Unavailable"}
              </button>
            </div>

            {/* 🔁 Task Status Tabs */}
            <div className="flex justify-center gap-4 mb-8">
              <button
                className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                  activeTab === "ongoing"
                    ? "bg-yellow-600 text-white"
                    : "bg-white text-yellow-700 border border-yellow-500"
                }`}
                onClick={() => setActiveTab("ongoing")}
              >
                Ongoing Tasks
              </button>
              <button
                className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                  activeTab === "completed"
                    ? "bg-green-600 text-white"
                    : "bg-white text-green-700 border border-green-500"
                }`}
                onClick={() => setActiveTab("completed")}
              >
                Completed Tasks
              </button>
            </div>

            {/* 📋 Task Cards */}
            <div className="grid gap-6">
              {filteredTasks.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-white"
                >
                  {activeTab === "ongoing"
                    ? "🚫 No tasks assigned or all tasks completed."
                    : "✅ No completed tasks yet."}
                </motion.p>
              ) : (
                filteredTasks.map((task: any, index: number) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                    className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-md border border-gray-200"
                  >
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                      Task #{task.id}
                    </h2>
                    <p className="text-gray-700 mb-1">📌 Description: {task.description}</p>
                    <p className="text-gray-700 mb-1">📍 Location: {task.location}</p>
                    <p className="text-gray-700 mb-1">🏷 Category: {task.category || "N/A"}</p>
                    <p className="text-gray-700 mb-1">🧭 Landmark: {task.landmark || "N/A"}</p>
                    <p className="text-gray-700 mb-1">⚡ Urgency: {task.urgency || "Normal"}</p>
                    <p className="text-sm text-gray-600 mb-2">
                      🕒 Status:{" "}
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-white text-xs ${
                          task.status === "pending"
                            ? "bg-yellow-500"
                            : task.status === "assigned"
                            ? "bg-blue-500"
                            : "bg-green-600"
                        }`}
                      >
                        {task.status.toUpperCase()}
                      </span>
                    </p>

                    {task.status !== "completed" && (
                      <button
                        className="mt-3 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md transition"
                        onClick={() => markCompleted(task.id)}
                      >
                        ✅ Mark as Completed
                      </button>
                    )}
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

export default WorkerDashboard;
