import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react"; // logout icon

interface Props {
  role: "user" | "admin" | "worker";
}

const LogoutButton: React.FC<Props> = ({ role }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to homepage
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-blue-800 hover:bg-blue-900 text-white px-3 py-1.5 rounded-md transition text-sm flex items-center gap-1"
    >
      <LogOut className="w-4 h-4" /> Logout
    </button>
  );
};

export default LogoutButton;
