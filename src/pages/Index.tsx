import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Droplets, Car, Trash2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-white flex flex-col">
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
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 group"
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-r ${issue.color} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                  >
                    <issue.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {issue.title}
                  </CardTitle>
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
      <div className="bg-white rounded-2xl p-8 shadow-md border hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group">
        <div className="flex flex-col items-center">
          <div className="bg-blue-100 text-blue-600 p-4 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A4.992 4.992 0 0112 15c1.657 0 3.156.672 4.243 1.757M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-700">User</h3>
          <span className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full mb-3">Complainant</span>
          <p className="text-gray-600 mb-6">Submit complaints and track progress</p>
          <div className="flex justify-center gap-4 w-full">
            <button 
              onClick={() => navigate("/login/user")} 
              className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition">
              Login
            </button>
            <button 
              onClick={() => navigate("/register/user")} 
              className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-medium transition">
              Register
            </button>
          </div>
        </div>
      </div>

      {/* Admin Card */}
      <div className="bg-white rounded-2xl p-8 shadow-md border hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group">
        <div className="flex flex-col items-center">
          <div className="bg-purple-100 text-purple-600 p-4 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 1.1-.9 2-2 2H6.5A1.5 1.5 0 015 11.5v-6A1.5 1.5 0 016.5 4H10c1.1 0 2 .9 2 2v5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 20l5-5m0 0l-5-5m5 5H9" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-700">Admin</h3>
          <span className="text-sm bg-purple-50 text-purple-600 px-3 py-1 rounded-full mb-3">Authority</span>
          <p className="text-gray-600 mb-6">Manage and assign tasks to workers</p>
          <button 
            onClick={() => navigate("/login/admin")} 
            className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium transition">
            Login
          </button>
        </div>
      </div>

      {/* Worker Card */}
      <div className="bg-white rounded-2xl p-8 shadow-md border hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group">
        <div className="flex flex-col items-center">
          <div className="bg-yellow-100 text-yellow-600 p-4 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17l4-4m0 0l4-4m-4 4v12" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-yellow-700">Worker</h3>
          <span className="text-sm bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full mb-3">Service Agent</span>
          <p className="text-gray-600 mb-6">View and complete assigned complaints</p>
          <button 
            onClick={() => navigate("/login/worker")} 
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md font-medium transition">
            Login
          </button>
        </div>
      </div>

    </div>
  </div>
</section>


{/* How Base Care Works Section */}
<section className="py-20 bg-white">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">How Base Care Works</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        A simple and efficient process for resolving issues in your community
      </p>
    </div>

    {/* Timeline Flow */}
    <div className="relative flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto">
      
      {/* Step 1 */}
      <div className="flex flex-col items-center text-center mb-10 md:mb-0 md:w-1/3 px-4">
        <div className="bg-blue-100 p-4 rounded-full mb-4 text-blue-600">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 00-3 0L3 14v4h4L20.5 6.5a2.121 2.121 0 000-3z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Report</h3>
        <p className="text-gray-600 text-sm">Users easily report issues via online form</p>
      </div>

      {/* Connector */}
      <div className="hidden md:block w-1/6 border-t-2 border-dashed border-gray-300"></div>

      {/* Step 2 */}
      <div className="flex flex-col items-center text-center mb-10 md:mb-0 md:w-1/3 px-4">
        <div className="bg-yellow-100 p-4 rounded-full mb-4 text-yellow-600">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 17v-2a4 4 0 014-4h3" />
            <path d="M14 7l3 3-3 3" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Assign</h3>
        <p className="text-gray-600 text-sm">Admin reviews and assigns to the appropriate worker</p>
      </div>

      {/* Connector */}
      <div className="hidden md:block w-1/6 border-t-2 border-dashed border-gray-300"></div>

      {/* Step 3 */}
      <div className="flex flex-col items-center text-center md:w-1/3 px-4">
        <div className="bg-green-100 p-4 rounded-full mb-4 text-green-600">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Resolve</h3>
        <p className="text-gray-600 text-sm">Workers resolve the issue and update the user</p>
      </div>
    </div>
  </div>
</section>

      {/* Footer */}
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
    </div>
  );
};

export default Index;
