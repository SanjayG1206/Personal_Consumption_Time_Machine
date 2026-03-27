import { useState } from "react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Download, Calendar, TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const Reports = () => {
  const [timeRange, setTimeRange] = useState("month");

  const weeklyData = [
    { name: "Week 1", carbon: 35, water: 580, energy: 80, waste: 4.2 },
    { name: "Week 2", carbon: 32, water: 550, energy: 75, waste: 3.8 },
    { name: "Week 3", carbon: 30, water: 520, energy: 72, waste: 3.5 },
    { name: "Week 4", carbon: 28, water: 490, energy: 68, waste: 3.2 },
  ];

  const monthlyData = [
    { name: "Jan", carbon: 145, water: 2400, energy: 340 },
    { name: "Feb", carbon: 138, water: 2300, energy: 325 },
    { name: "Mar", carbon: 125, water: 2140, energy: 305 },
  ];

  const categoryComparison = [
    { category: "Carbon (kg)", thisMonth: 125, lastMonth: 138, change: -9.4 },
    { category: "Water (L)", thisMonth: 2140, lastMonth: 2300, change: -7.0 },
    { category: "Energy (kWh)", thisMonth: 305, lastMonth: 325, change: -6.2 },
    { category: "Waste (kg)", thisMonth: 14, lastMonth: 16, change: -12.5 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into your sustainability journey</p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Download PDF Report
        </Button>
      </div>

      {/* Time Range Selector */}
      <Card>
        <div className="flex items-center gap-3 flex-wrap">
          <Calendar className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Time Range:</span>
          <div className="flex gap-2">
            {[
              { value: "week", label: "This Week" },
              { value: "month", label: "This Month" },
              { value: "quarter", label: "This Quarter" },
              { value: "year", label: "This Year" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setTimeRange(option.value)}
                className={`px-4 py-2 rounded-lg border-2 transition-all text-sm ${
                  timeRange === option.value
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 hover:border-gray-300 text-gray-700"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {categoryComparison.map((item, index) => {
          const isPositive = item.change < 0;
          return (
            <Card
              key={index}
              className={isPositive ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}
            >
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">{item.category}</p>
                <p className="text-3xl font-bold text-gray-900 mb-2">{item.thisMonth}</p>
                <div
                  className={`flex items-center justify-center gap-1 text-sm ${
                    isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isPositive ? (
                    <TrendingDown className="w-4 h-4" />
                  ) : (
                    <TrendingUp className="w-4 h-4" />
                  )}
                  <span className="font-medium">{Math.abs(item.change)}%</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Weekly Trends */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Trend Analysis</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={weeklyData}>
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
              dataKey="carbon"
              stroke="#ef4444"
              strokeWidth={3}
              name="Carbon (kg)"
              dot={{ fill: "#ef4444", r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="energy"
              stroke="#f59e0b"
              strokeWidth={3}
              name="Energy (kWh)"
              dot={{ fill: "#f59e0b", r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="waste"
              stroke="#8b5cf6"
              strokeWidth={3}
              name="Waste (kg)"
              dot={{ fill: "#8b5cf6", r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Carbon</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Energy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Waste</span>
          </div>
        </div>
      </Card>

      {/* Monthly Comparison */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Comparison</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={monthlyData}>
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
            <Bar dataKey="carbon" fill="#ef4444" name="Carbon (kg)" radius={[8, 8, 0, 0]} />
            <Bar dataKey="energy" fill="#f59e0b" name="Energy (kWh)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Detailed Stats Table */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Category
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                  This Month
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                  Last Month
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                  Change
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {categoryComparison.map((item, index) => {
                const isPositive = item.change < 0;
                return (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">{item.category}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 text-right font-medium">
                      {item.thisMonth}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 text-right">
                      {item.lastMonth}
                    </td>
                    <td
                      className={`py-3 px-4 text-sm text-right font-medium ${
                        isPositive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {isPositive ? "↓" : "↑"} {Math.abs(item.change)}%
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          isPositive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {isPositive ? "Improving" : "Needs Work"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Key Insights */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Key Insights</h3>
        <div className="space-y-3">
          <div className="p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-900">
              <strong className="text-green-600">Great progress!</strong> Your carbon emissions
              have decreased by 9.4% compared to last month.
            </p>
          </div>
          <div className="p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-900">
              <strong className="text-green-600">Water conservation champion!</strong> You've
              reduced water usage by 7% this month.
            </p>
          </div>
          <div className="p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-900">
              <strong className="text-blue-600">Trend alert:</strong> Your sustainability scores
              show consistent improvement week over week.
            </p>
          </div>
          <div className="p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-900">
              <strong className="text-purple-600">Next milestone:</strong> You're only 12% away
              from achieving your quarterly carbon reduction goal!
            </p>
          </div>
        </div>
      </Card>

      {/* Export Options */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Export as PDF
          </Button>
          <Button variant="outline" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Export as CSV
          </Button>
          <Button variant="outline" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Export as Excel
          </Button>
        </div>
      </Card>
    </div>
  );
};
