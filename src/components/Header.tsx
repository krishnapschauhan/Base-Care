import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Home, FileText, Search, Info, LogOut, Menu } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setRole(user?.role || null);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setRole(null);
    navigate("/", { replace: true });
  };

  const isHomePage = location.pathname === "/";
  const isDashboard =
    location.pathname.includes("/dashboard") ||
    location.pathname.includes("/admin") ||
    location.pathname.includes("/worker") ||
    location.pathname.includes("/user") ||
    location.pathname.includes("/status") ||
    (!!role && isHomePage);

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    {
      name: "Report an Issue",
      path:
        role === "user"
          ? "/user/dashboard"
          : role === "admin"
          ? "/admin/dashboard"
          : role === "worker"
          ? "/worker/dashboard"
          : "/login/user",
      icon: FileText,
    },
    ...(role === "user" || role === null
      ? [{ name: "Report Status", path: "/status", icon: Search }]
      : []),
    ...(isHomePage && !role
      ? [{ name: "About Us", path: "/about", icon: Info }]
      : []),
  ];

  return (
    <header className="bg-black text-white">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              BaseCare: Army Issue Reporting
            </h1>
            <p className="text-gray-400 text-sm sm:text-base font-medium">
              Discipline. Report. Resolve.
            </p>
          </div>

          {/* Hamburger button for mobile */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex flex-wrap items-center gap-4">
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
            {isDashboard && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-white bg-black border border-white/20 hover:bg-white/10 transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div className="mt-4 flex flex-col gap-3 lg:hidden">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `group relative px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-white text-black"
                      : "text-gray-300 hover:text-white hover:bg-white/10 border border-white/10"
                  }`
                }
              >
                <div className="flex items-center space-x-2">
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{item.name}</span>
                </div>
              </NavLink>
            ))}
            {isDashboard && (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-black border border-white/20 hover:bg-white/10"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
