import { Card } from "../components/ui/Card";
import { ProgressCircle } from "../components/ui/ProgressCircle";
import { Button } from "../components/ui/Button";
import { useSustainability } from "../context/SustainabilityContext";
import { useNavigate } from "react-router";
import {
  Cloud,
  Droplet,
  Zap,
  Trash2,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Plus,
  PlayCircle,
  Leaf,
} from "lucide-react";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const Dashboard = () => {
  const { sustainabilityScore } = useSustainability();
  const navigate = useNavigate();

  const summaryData = [
    {
      title: "Carbon Footprint",
      value: "145",
      unit: "kg CO₂",
      change: -12,
      icon: Cloud,
      color: "#3b82f6",
      bgColor: "#dbeafe",
    },
    {
      title: "Water Usage",
      value: "2,340",
      unit: "liters",
      change: -8,
      icon: Droplet,
      color: "#06b6d4",
      bgColor: "#cffafe",
    },
    {
      title: "Energy Usage",
      value: "324",
      unit: "kWh",
      change: 5,
      icon: Zap,
      color: "#f59e0b",
      bgColor: "#fef3c7",
    },
    {
      title: "Waste Generated",
      value: "18",
      unit: "kg",
      change: -15,
      icon: Trash2,
      color: "#ef4444",
      bgColor: "#fee2e2",
    },
  ];

  const trendData = [
    { name: "Mon", value: 24 },
    { name: "Tue", value: 28 },
    { name: "Wed", value: 22 },
    { name: "Thu", value: 25 },
    { name: "Fri", value: 20 },
    { name: "Sat", value: 18 },
    { name: "Sun", value: 16 },
  ];

  const categoryData = [
    { name: "Travel", value: 35, color: "#3b82f6" },
    { name: "Energy", value: 30, color: "#f59e0b" },
    { name: "Water", value: 20, color: "#06b6d4" },
    { name: "Waste", value: 15, color: "#ef4444" },
  ];

  const alerts = [
    {
      type: "warning",
      message: "High electricity usage today",
      time: "2 hours ago",
      icon: AlertCircle,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      type: "danger",
      message: "Excess plastic usage detected",
      time: "5 hours ago",
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  const suggestions = [
    { text: "Use public transport instead of car", impact: "Save 5 kg CO₂/day" },
    { text: "Reduce AC usage by 2 hours", impact: "Save 3 kWh/day" },
    { text: "Switch to reusable water bottles", impact: "Reduce 2 kg waste/week" },
    { text: "Take shorter showers", impact: "Save 50 liters/day" },
  ];

  return (
    <div className="space-y-6">
      {/* Sustainability Score Card */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Sustainability Score</h2>
            <p className="text-gray-600 mb-4">
              Great job! You're doing better than 68% of users
            </p>
            <div className="flex gap-4">
              <Button onClick={() => navigate("/data-entry")}>
                <Plus className="w-4 h-4 mr-2" />
                Add Data
              </Button>
              <Button variant="outline" onClick={() => navigate("/time-rewind")}>
                <PlayCircle className="w-4 h-4 mr-2" />
                Run Simulation
              </Button>
            </div>
          </div>
          <div>
            <ProgressCircle value={sustainabilityScore} max={100} size={160} strokeWidth={12} color="#10b981" />
          </div>
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryData.map((item, index) => {
          const Icon = item.icon;
          const isPositive = item.change < 0;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: item.bgColor }}
                >
                  <Icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${isPositive ? "text-green-600" : "text-red-600"}`}>
                  {isPositive ? (
                    <TrendingDown className="w-4 h-4" />
                  ) : (
                    <TrendingUp className="w-4 h-4" />
                  )}
                  <span>{Math.abs(item.change)}%</span>
                </div>
              </div>
              <h3 className="text-sm text-gray-600 mb-1">{item.title}</h3>
              <p className="text-2xl font-bold text-gray-900">
                {item.value}
                <span className="text-sm font-normal text-gray-500 ml-1">{item.unit}</span>
              </p>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Weekly Carbon Emission Trend
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: "#10b981", r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Pie Chart */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Emission Category Breakdown
          </h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {categoryData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.name}</span>
                <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Alerts and Suggestions Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts Panel */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">⚠️ Alerts</h3>
            <span className="text-xs text-gray-500">Last 24 hours</span>
          </div>
          <div className="space-y-3">
            {alerts.map((alert, index) => {
              const Icon = alert.icon;
              return (
                <div
                  key={index}
                  className={`flex items-start gap-3 p-3 rounded-lg ${alert.bgColor}`}
                >
                  <Icon className={`w-5 h-5 mt-0.5 ${alert.color}`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Quick Suggestions Panel */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">💡 Quick Suggestions</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate("/recommendations")}>
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors cursor-pointer"
              >
                <Leaf className="w-5 h-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{suggestion.text}</p>
                  <p className="text-xs text-green-600 font-medium mt-1">
                    {suggestion.impact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
