import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Droplets, Car, Trash2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate(); // initialize the router

  const issueTypes = [
    {
      icon: Zap,
      title: "Electrical",
      description: "Power outages, faulty lights, hazards",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Droplets,
      title: "Water",
      description: "Leaks, supply issues, drainage",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: Car,
      title: "Roads",
      description: "Potholes, damaged roads, signals",
      color: "from-gray-600 to-gray-800"
    },
    {
      icon: Trash2,
      title: "Sanitation",
      description: "Waste management, hygiene, pests",
      color: "from-green-400 to-emerald-500"
    }
  ];

  const stats = [
    { number: "1,247", label: "Issues Reported", color: "text-blue-600" },
    { number: "856", label: "Issues Resolved", color: "text-green-600" },
    { number: "48h", label: "Avg Response Time", color: "text-purple-600" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      
      {/* Issue Types Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What can you report?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our main categories to quickly report community issues
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {issueTypes.map((issue, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 group">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-r ${issue.color} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                    <issue.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{issue.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-center text-gray-600 leading-relaxed">
                    {issue.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portal Selection Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Portal</h2>
            <p className="text-lg text-gray-600">Access the system based on your role</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
            
            {/* User Card */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">User</h3>
              <p className="text-gray-600 mb-6">Submit complaints and track progress</p>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => navigate("/login/user")} 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                  Login
                </button>
                <button 
                  onClick={() => navigate("/register/user")} 
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md">
                  Register
                </button>
              </div>
            </div>

            {/* Admin Card */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Admin</h3>
              <p className="text-gray-600 mb-6">Manage and assign tasks to workers</p>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => navigate("/login/admin")} 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                  Login
                </button>
              </div>
            </div>

            {/* Worker Card */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Worker</h3>
              <p className="text-gray-600 mb-6">View and complete assigned complaints</p>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => navigate("/login/worker")} 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                  Login
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-10 text-white">
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
    </div>
  );
};

export default Index;
