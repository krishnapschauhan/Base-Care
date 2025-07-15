import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { UserCircle2, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const team = [
  {
    name: "Krishna Pratap Singh Chauhan",
    role: "Full Stack Developer",
    branch: "Computer Science and Engineering",
    motive: "Building meaningful software that solves real problems.",
    github: "https://github.com/krishnapratap509",
    linkedin: "https://linkedin.com/in/krishnapratap509",
  },
  {
    name: "Kartikeya Sharma",
    role: "Frontend Developer",
    branch: "Computer Science and Engineering",
    motive: "Designing intuitive and elegant user interfaces.",
    github: "https://github.com/kartikeyasharma",
    linkedin: "https://linkedin.com/in/kartikeyasharma",
  },
  {
    name: "Deeksha Sharma",
    role: "Backend Developer",
    branch: "Computer Science and Engineering",
    motive: "Creating reliable systems that run efficiently.",
    github: "https://github.com/deeksha-sharma",
    linkedin: "https://linkedin.com/in/deeksha-sharma",
  },
  {
    name: "Shivani Tyagi",
    role: "UI/UX Designer",
    branch: "Computer Science and Engineering",
    motive: "Crafting user-centric designs for better experience.",
    github: "https://github.com/shivanityagi",
    linkedin: "https://linkedin.com/in/shivanityagi",
  },
];

const AboutUs = () => {
  const navigate = useNavigate();

  return (
<div
  className="min-h-screen bg-no-repeat bg-top bg-fixed relative text-white"
  style={{
    backgroundImage: "url('/aboutus.jpg')",
    backgroundSize: "100% auto", // full width, proportional height
    backgroundPosition: "top center",
  }}
>
     {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Content */}
      <div className="relative z-10">
        <Header />

        {/* Hero */}
        <section className="py-20 text-center px-4">
          <h1 className="text-5xl font-bold mb-4">About Base Care</h1>
          <p className="text-lg max-w-3xl mx-auto">
            Base Care is a digital complaint management system designed for army base communities. It streamlines issue reporting, task assignment, and resolution tracking — ensuring speed, accountability, and clarity in maintenance processes.
          </p>
        </section>

        {/* Team Section */}
        <section className="py-20 text-center">
          <h2 className="text-4xl font-bold text-indigo-300 mb-12">Meet the Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto px-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-white/10 p-6 rounded-2xl shadow-lg text-white border border-white/20 backdrop-blur"
              >
                <div className="flex justify-center mb-4">
                  <UserCircle2 className="w-20 h-20 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-sm text-indigo-200 mb-1">{member.role}</p>
                <p className="text-sm text-gray-300 mb-3">{member.branch}</p>
                <p className="text-gray-200 text-sm italic mb-4">"{member.motive}"</p>
                <div className="flex justify-center gap-4 mt-2">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-indigo-200 hover:underline"
                  >
                    <Github className="w-4 h-4 mr-1" /> GitHub
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-indigo-200 hover:underline"
                  >
                    <Linkedin className="w-4 h-4 mr-1" /> LinkedIn
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-20 text-center px-6">
          <h2 className="text-3xl font-bold text-indigo-300 mb-6">Tech Stack</h2>
          <p className="text-lg max-w-3xl mx-auto mb-8 text-gray-200">
            Built using modern technologies for speed, security, and scalability.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              "React.js",
              "TypeScript",
              "Tailwind CSS",
              "Framer Motion",
              "Node.js",
              "Express.js",
              "PostgreSQL",
              "pgAdmin",
              "JWT",
              "GitHub",
            ].map((tech, index) => (
              <div
                key={index}
                className="bg-white/10 py-3 px-4 rounded-lg shadow-sm text-white font-medium border border-white/10"
              >
                {tech}
              </div>
            ))}
          </div>
        </section>

        {/* Project Summary */}
        <section className="py-20 text-center px-6">
          <h2 className="text-3xl font-bold text-indigo-300 mb-6">Project Summary & Usage</h2>
          <p className="text-lg max-w-4xl mx-auto text-gray-200 leading-relaxed">
            Base Care includes separate portals for Users, Admins, and Workers. Users report issues, Admins assign tasks, and Workers resolve them. It covers key categories like water, electricity, sanitation, and roads — helping improve life inside army base communities.
          </p>
        </section>

        {/* Contact Us */}
        <section className="py-20 text-center px-6">
          <h2 className="text-3xl font-bold text-indigo-300 mb-6">Contact Us</h2>
          <p className="text-lg mb-2 text-gray-200">📧 basecare@army.org</p>
          <p className="text-lg mb-6 text-gray-200">🌐 www.basecare.army</p>
          <a
            href="https://github.com/krishnapratap509/base-care"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition font-medium"
          >
            View Project on GitHub
          </a>
        </section>

        {/* Footer */}
        <footer className="bg-black bg-opacity-70 py-10 text-white text-center">
          <p className="text-sm">© 2025 Base Care – Every report strengthens the mission.</p>
        </footer>
      </div>
    </div>
  );
};

export default AboutUs;
