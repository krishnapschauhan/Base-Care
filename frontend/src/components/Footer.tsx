import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black py-10 text-white mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h3 className="text-2xl font-bold">Base Care</h3>
          <p className="text-gray-400 text-sm mt-1">
            © 2025 Base Care – Every report strengthens the mission.
          </p>
        </div>
        <div className="text-center md:text-right space-y-1">
          <p className="text-sm text-gray-400">📧 basecare@army.org</p>
          <p className="text-sm text-gray-400">🌐 www.basecare.army</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
