import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";

const WorkerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      if (user.role !== "worker") {
        alert("❌ Access denied: You are not a worker.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("✅ Worker login successful!");
      navigate("/worker/dashboard");
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-200 to-orange-300">
      <div className="relative bg-white/80 backdrop-blur-lg border border-white/30 rounded-3xl shadow-xl w-full max-w-md p-8 md:p-10 animate-fade-in-down">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Worker Login</h2>
        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="worker@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 rounded-lg shadow-md transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default WorkerLogin;
