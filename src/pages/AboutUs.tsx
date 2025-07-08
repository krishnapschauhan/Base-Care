import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";

const team = [
  {
    name: "Krishna Pratap Singh CHauhan",
    role: "Team Lead & Full Stack Developer",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Kartikeya SHarma",
    role: "Frontend Developer",
    image: "https://randomuser.me/api/portraits/men/64.jpg",
  },
  {
    name: "Deeksha Sharma",
    role: "Backend Developer",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Shivani Tyagi",
    role: "UI/UX Designer",
    image: "https://randomuser.me/api/portraits/women/75.jpg",
  },
];

const AboutUs = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 py-16 px-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-indigo-800">About Us</h1>
          <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
            We are a team of passionate developers working on a modern, efficient issue-reporting platform for army bases.
          </p>
        </motion.div>

        {/* Team Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
        >
          {team.map((member, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-200"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-indigo-200"
              />
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.role}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Description Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-5xl mx-auto mt-20 text-center"
        >
          <h2 className="text-3xl font-semibold text-indigo-800 mb-4">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our goal is to simplify complaint reporting and resolution processes for army personnel. With BaseCare, we ensure clarity,
            accountability, and timely action — through smart dashboards, secure access, and real-time task tracking.
          </p>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-700 text-lg mb-3">Want to know more or contribute?</p>
          <button className="px-6 py-3 bg-indigo-700 text-white rounded-full hover:bg-indigo-800 transition font-medium">
            Contact Us
          </button>
        </motion.div>
      </div>
    </>
  );
};

export default AboutUs;
