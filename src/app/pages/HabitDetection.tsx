import { Card } from "../components/ui/Card";
import { AlertTriangle, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const HabitDetection = () => {
  const risks = [
    {
      id: 1,
      level: "high",
      title: "Daily Car Usage Detected",
      description: "You've used your car for commuting every day this week",
      frequency: "7 days/week",
      impact: "High carbon emissions",
      suggestion: "Consider using public transport at least 3 times a week",
    },
    {
      id: 2,
      level: "high",
      title: "Excessive AC Usage",
      description: "Air conditioner running 12+ hours daily",
      frequency: "12 hours/day",
      impact: "High energy consumption",
      suggestion: "Reduce AC usage to 8 hours and set temperature to 24°C",
    },
    {
      id: 3,
      level: "medium",
      title: "High Water Usage Pattern",
      description: "Water consumption consistently above average",
      frequency: "Daily pattern",
      impact: "Increased water footprint",
      suggestion: "Check for leaks and take shorter showers",
    },
    {
      id: 4,
      level: "medium",
      title: "Plastic Bottle Usage",
      description: "Purchasing plastic bottles frequently",
      frequency: "5-6 bottles/week",
      impact: "Plastic waste accumulation",
      suggestion: "Switch to a reusable water bottle",
    },
    {
      id: 5,
      level: "low",
      title: "Late Night Energy Usage",
      description: "Lights and devices left on after midnight",
      frequency: "3-4 nights/week",
      impact: "Wasted electricity",
      suggestion: "Turn off devices before sleeping",
    },
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high":
        return {
          bg: "bg-red-50",
          border: "border-red-300",
          text: "text-red-700",
          badge: "bg-red-100 text-red-700",
        };
      case "medium":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-300",
          text: "text-yellow-700",
          badge: "bg-yellow-100 text-yellow-700",
        };
      case "low":
        return {
          bg: "bg-blue-50",
          border: "border-blue-300",
          text: "text-blue-700",
          badge: "bg-blue-100 text-blue-700",
        };
      default:
        return {
          bg: "bg-gray-50",
          border: "border-gray-300",
          text: "text-gray-700",
          badge: "bg-gray-100 text-gray-700",
        };
    }
  };

  // Behavior trend data
  const behaviorData = [
    { day: "Mon", carUsage: 85, acUsage: 75, waterUsage: 65 },
    { day: "Tue", carUsage: 90, acUsage: 80, waterUsage: 70 },
    { day: "Wed", carUsage: 85, acUsage: 78, waterUsage: 68 },
    { day: "Thu", carUsage: 92, acUsage: 82, waterUsage: 72 },
    { day: "Fri", carUsage: 88, acUsage: 85, waterUsage: 75 },
    { day: "Sat", carUsage: 70, acUsage: 70, waterUsage: 60 },
    { day: "Sun", carUsage: 65, acUsage: 68, waterUsage: 58 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Habit & Mistake Detection</h1>
        <p className="text-gray-600">
          AI-powered analysis of your behavioral patterns and sustainability risks
        </p>
      </div>

      {/* Risk Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">
                {risks.filter((r) => r.level === "high").length}
              </p>
              <p className="text-sm text-gray-600">High Risk Habits</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">
                {risks.filter((r) => r.level === "medium").length}
              </p>
              <p className="text-sm text-gray-600">Medium Risk Habits</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">
                {risks.filter((r) => r.level === "low").length}
              </p>
              <p className="text-sm text-gray-600">Low Risk Habits</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Risk Cards */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detected Patterns</h3>
        <div className="space-y-4">
          {risks.map((risk) => {
            const colors = getRiskColor(risk.level);
            return (
              <Card
                key={risk.id}
                className={`${colors.bg} ${colors.border} border-2`}
              >
                <div className="flex items-start gap-4">
                  <AlertTriangle className={`w-6 h-6 ${colors.text} mt-1 flex-shrink-0`} />

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{risk.title}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${colors.badge}`}
                      >
                        {risk.level.toUpperCase()} RISK
                      </span>
                    </div>

                    <p className="text-sm text-gray-700 mb-3">{risk.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Frequency</p>
                        <p className="text-sm font-medium text-gray-900">{risk.frequency}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Impact</p>
                        <p className="text-sm font-medium text-gray-900">{risk.impact}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Status</p>
                        <p className="text-sm font-medium text-gray-900">Active</p>
                      </div>
                    </div>

                    <div className="bg-white bg-opacity-70 p-3 rounded-lg border border-gray-200">
                      <p className="text-xs text-gray-600 mb-1">💡 Suggestion</p>
                      <p className="text-sm text-gray-900">{risk.suggestion}</p>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Behavior Frequency Graph */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Weekly Behavior Trends
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={behaviorData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" stroke="#9ca3af" />
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
              dataKey="carUsage"
              stroke="#ef4444"
              strokeWidth={2}
              name="Car Usage"
              dot={{ fill: "#ef4444", r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="acUsage"
              stroke="#f59e0b"
              strokeWidth={2}
              name="AC Usage"
              dot={{ fill: "#f59e0b", r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="waterUsage"
              stroke="#06b6d4"
              strokeWidth={2}
              name="Water Usage"
              dot={{ fill: "#06b6d4", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Car Usage</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-sm text-gray-600">AC Usage</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Water Usage</span>
          </div>
        </div>
      </Card>

      {/* Insights */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
            🧠
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Insights</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>
                  Your car usage peaks on Thursdays. Consider carpooling or using public transport
                  on this day.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>
                  AC usage has increased by 15% this week compared to last week. Check your
                  thermostat settings.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>
                  Water usage is highest on Fridays. This might indicate laundry day - consider
                  using full loads only.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};
