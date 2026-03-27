import { useState } from "react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingDown, ArrowRight } from "lucide-react";

export const TimeRewind = () => {
  const [selectedScenario, setSelectedScenario] = useState("bus-vs-car");

  const scenarios = [
    { id: "bus-vs-car", label: "Bus vs Car", icon: "🚌 vs 🚗" },
    { id: "solar-vs-grid", label: "Solar vs Grid", icon: "☀️ vs ⚡" },
    { id: "reusable-vs-plastic", label: "Reusable vs Plastic", icon: "♻️ vs 🗑️" },
    { id: "shower-time", label: "Shorter Shower", icon: "🚿" },
  ];

  const scenarioData: { [key: string]: any } = {
    "bus-vs-car": {
      title: "Public Transport vs Car",
      before: { label: "Car Commute", value: 145, unit: "kg CO₂" },
      after: { label: "Bus Commute", value: 58, unit: "kg CO₂" },
      reduction: 60,
      insight: "You could have saved 60% emissions by using public transport",
      chartData: [
        { name: "Week 1", before: 35, after: 14 },
        { name: "Week 2", before: 38, after: 15 },
        { name: "Week 3", before: 36, after: 14 },
        { name: "Week 4", before: 36, after: 15 },
      ],
    },
    "solar-vs-grid": {
      title: "Solar Energy vs Grid Electricity",
      before: { label: "Grid Electricity", value: 324, unit: "kWh" },
      after: { label: "Solar Energy", value: 129, unit: "kWh" },
      reduction: 75,
      insight: "You could have saved 75% of grid electricity with solar panels",
      chartData: [
        { name: "Week 1", before: 85, after: 32 },
        { name: "Week 2", before: 78, after: 31 },
        { name: "Week 3", before: 82, after: 33 },
        { name: "Week 4", before: 79, after: 33 },
      ],
    },
    "reusable-vs-plastic": {
      title: "Reusable Bottles vs Plastic",
      before: { label: "Plastic Bottles", value: 18, unit: "kg waste" },
      after: { label: "Reusable Bottles", value: 2, unit: "kg waste" },
      reduction: 89,
      insight: "You could have reduced 89% of plastic waste with reusable bottles",
      chartData: [
        { name: "Week 1", before: 4.5, after: 0.5 },
        { name: "Week 2", before: 4.2, after: 0.5 },
        { name: "Week 3", before: 4.8, after: 0.5 },
        { name: "Week 4", before: 4.5, after: 0.5 },
      ],
    },
    "shower-time": {
      title: "Shorter Shower Duration",
      before: { label: "10 min Shower", value: 2340, unit: "liters" },
      after: { label: "5 min Shower", value: 1170, unit: "liters" },
      reduction: 50,
      insight: "You could have saved 50% water by taking shorter showers",
      chartData: [
        { name: "Week 1", before: 580, after: 290 },
        { name: "Week 2", before: 600, after: 300 },
        { name: "Week 3", before: 590, after: 295 },
        { name: "Week 4", before: 570, after: 285 },
      ],
    },
  };

  const currentData = scenarioData[selectedScenario];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Time-Rewind Simulation</h1>
        <p className="text-gray-600">
          See what could have been different with sustainable choices
        </p>
      </div>

      {/* Scenario Selector */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Scenario</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => setSelectedScenario(scenario.id)}
              className={`p-4 rounded-lg border-2 transition-all text-center ${
                selectedScenario === scenario.id
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="text-2xl mb-2">{scenario.icon}</div>
              <div className="text-sm font-medium text-gray-900">{scenario.label}</div>
            </button>
          ))}
        </div>
      </Card>

      {/* Before vs After Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Before Card */}
        <Card className="bg-red-50 border-red-200">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Before</p>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {currentData.before.label}
            </h3>
            <div className="text-4xl font-bold text-red-600 mb-2">
              {currentData.before.value}
            </div>
            <p className="text-sm text-gray-600">{currentData.before.unit}</p>
          </div>
        </Card>

        {/* Arrow */}
        <div className="flex items-center justify-center">
          <div className="text-center">
            <ArrowRight className="w-12 h-12 text-green-500 mx-auto mb-2" />
            <div className="px-4 py-2 bg-green-100 rounded-full">
              <div className="flex items-center gap-2 text-green-700">
                <TrendingDown className="w-5 h-5" />
                <span className="text-2xl font-bold">{currentData.reduction}%</span>
              </div>
              <p className="text-xs text-green-600 mt-1">Reduction</p>
            </div>
          </div>
        </div>

        {/* After Card */}
        <Card className="bg-green-50 border-green-200">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">After</p>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {currentData.after.label}
            </h3>
            <div className="text-4xl font-bold text-green-600 mb-2">
              {currentData.after.value}
            </div>
            <p className="text-sm text-gray-600">{currentData.after.unit}</p>
          </div>
        </Card>
      </div>

      {/* Chart Comparison */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Monthly Comparison: {currentData.title}
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={currentData.chartData}>
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
            <Bar dataKey="before" fill="#ef4444" name="Before" radius={[8, 8, 0, 0]} />
            <Bar dataKey="after" fill="#10b981" name="After" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Insight Box */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">💡</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Insight</h3>
            <p className="text-gray-700 text-lg">{currentData.insight}</p>
            <div className="mt-4 flex gap-3">
              <Button>Apply This Change</Button>
              <Button variant="outline">Set as Goal</Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <div className="text-3xl mb-2">🌍</div>
          <p className="text-2xl font-bold text-gray-900">
            {(currentData.before.value - currentData.after.value).toFixed(0)}
          </p>
          <p className="text-sm text-gray-600 mt-1">{currentData.before.unit} Saved</p>
        </Card>

        <Card className="text-center">
          <div className="text-3xl mb-2">📅</div>
          <p className="text-2xl font-bold text-gray-900">30</p>
          <p className="text-sm text-gray-600 mt-1">Days in Period</p>
        </Card>

        <Card className="text-center">
          <div className="text-3xl mb-2">🌱</div>
          <p className="text-2xl font-bold text-gray-900">
            {Math.round((currentData.before.value - currentData.after.value) / 20)}
          </p>
          <p className="text-sm text-gray-600 mt-1">Trees Equivalent</p>
        </Card>
      </div>
    </div>
  );
};
