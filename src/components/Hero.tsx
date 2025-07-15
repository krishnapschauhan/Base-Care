import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const getUser = () => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      return token && user?.role === "user";
    } catch {
      return false;
    }
  };

  const handleReportClick = () => {
    if (getUser()) {
      navigate("/user/dashboard");
    } else {
      navigate("/login/user", { state: { from: "/user/dashboard" } });
    }
  };

  const handleStatusClick = () => {
    if (getUser()) {
      navigate("/status");
    } else {
      navigate("/login/user", { state: { from: "/status" } }); // store destination
    }
  };

  return (
    <div
      className="relative w-full h-[610px] flex flex-col justify-end bg-no-repeat bg-top"
      style={{
        backgroundImage: "url('/heroimage.jpg')",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      <div className="text-center pb-10 px-4 z-10">
        <h2 className="text-white text-3xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-md">
          Strengthening the Base Through Swift Action
        </h2>
        <p className="text-gray-200 text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-sm">
          Help us maintain operational readiness. Report facility issues directly to the command center.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            onClick={handleReportClick}
            className="group bg-white text-black px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-gray-100 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <span>Report Facility Issue</span>
          </button>

          <button
            onClick={handleStatusClick}
            className="group border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
          >
            <span>View Response Status</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
