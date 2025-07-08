import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  role: "user" | "admin" | "worker";
}

const LogoutButton: React.FC<Props> = ({ role }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate(`/login/${role}`);
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition text-sm font-medium"
    >
      🚪 Logout
    </button>
  );
};

export default LogoutButton;
