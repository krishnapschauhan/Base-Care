import { NavLink } from "react-router-dom";
import { Home, FileText, Search, Info } from "lucide-react";

const Header = () => {
  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Report an Issue", path: "/report", icon: FileText },
    { name: "Report Status", path: "/status", icon: Search },
    { name: "About Us", path: "/about", icon: Info },
  ];

  return (
    <header className="bg-black text-white">
      <nav className="container mx-auto px-6 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left">
            <h1 className="text-2xl lg:text-3xl font-bold text-white">
              BaseCare: Army Issue Reporting
            </h1>
            <p className="text-gray-400 text-base lg:text-lg font-medium tracking-wide">
              Discipline. Report. Resolve.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `group relative px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-white text-black shadow-md"
                      : "text-gray-300 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-white/20"
                  }`
                }
              >
                <div className="flex items-center space-x-2">
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{item.name}</span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
