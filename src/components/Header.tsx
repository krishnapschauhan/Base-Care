import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Home, FileText, Search, Info, LogOut } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);

  // ✅ Detect route changes and update role
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

  // ✅ Treat homepage as dashboard if user is logged in
  const isDashboard =
    location.pathname.includes("/dashboard") ||
    location.pathname.includes("/admin") ||
    location.pathname.includes("/worker") ||
    location.pathname.includes("/user") ||
    location.pathname.includes("/status") ||
    (!!role && isHomePage);

  // ✅ Dynamic nav items based on role and location
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
      </nav>
    </header>
  );
};

export default Header;
