import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "@/lib/api";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from || "/user/dashboard";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, user } = response.data;

      if (user.role !== "user") {
        alert("Access denied. You are not a user.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      alert("✅ Login successful!");
      navigate(redirectPath, { replace: true });
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const error = err as { response?: { data?: { message?: string } } };
        alert(error.response?.data?.message || "Login failed");
      } else {
        alert("Login failed due to unknown error.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-indigo-300">
      <div className="relative bg-white/80 backdrop-blur-lg border border-white/30 rounded-3xl shadow-xl w-full max-w-md p-8 md:p-10 animate-fade-in-down">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">User Login</h2>
        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium shadow-md transition"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-700">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register/user")}
              className="text-blue-600 hover:underline cursor-pointer font-semibold"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
