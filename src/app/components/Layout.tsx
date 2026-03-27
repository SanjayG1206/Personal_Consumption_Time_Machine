import { Outlet, Link, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Plus,
  Clock,
  Target,
  Lightbulb,
  AlertTriangle,
  Home as HomeIcon,
  FileText,
  Trophy,
  BarChart3,
  User,
  Bell,
  Moon,
  Sun,
  LogOut,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useSustainability } from "../context/SustainabilityContext";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/Button";
import { useState } from "react";

export const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { sustainabilityScore } = useSustainability();
  const { user, logout } = useAuth();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Add Data", href: "/data-entry", icon: Plus },
    { name: "Time-Rewind", href: "/time-rewind", icon: Clock },
    { name: "Impact Planner", href: "/impact-planner", icon: Target },
    { name: "Recommendations", href: "/recommendations", icon: Lightbulb },
    { name: "Habit Detection", href: "/habit-detection", icon: AlertTriangle },
    { name: "Digital Twin", href: "/digital-twin", icon: HomeIcon },
    { name: "Daily Report", href: "/daily-report", icon: FileText },
    { name: "Goals", href: "/goals", icon: Trophy },
    { name: "Reports", href: "/reports", icon: BarChart3 },
    { name: "Profile", href: "/profile", icon: User },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Get user initials
  const getUserInitials = () => {
    if (!user?.name) return "U";
    const names = user.name.split(" ");
    if (names.length >= 2) {
      return names[0][0] + names[1][0];
    }
    return names[0][0];
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
              <span className="text-white">🌍</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">EcoTracker</h1>
              <p className="text-xs text-gray-500">Time Machine</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-green-50 text-green-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Navbar */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {navigation.find((item) => item.href === location.pathname)?.name || "Dashboard"}
              </h2>
              <p className="text-sm text-gray-500">Welcome back! Track your sustainability journey</p>
            </div>

            <div className="flex items-center gap-4">
              {/* Sustainability Score Badge */}
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border border-green-200">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold">
                  {sustainabilityScore}
                </div>
                <span className="text-sm font-medium text-green-700">Eco Score</span>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm text-gray-900">High electricity usage today</p>
                          <p className="text-xs text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm text-gray-900">Excess plastic usage detected</p>
                          <p className="text-xs text-gray-500">5 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm text-gray-900">Goal achieved: Water reduction</p>
                          <p className="text-xs text-gray-500">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* User Profile */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-white font-semibold">
                  {getUserInitials()}
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};