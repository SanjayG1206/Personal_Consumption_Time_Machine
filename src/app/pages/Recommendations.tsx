import { useState } from "react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Leaf, Car, Zap, Droplet, Trash2, Filter } from "lucide-react";

export const Recommendations = () => {
  const [filter, setFilter] = useState<string>("all");

  const recommendations = [
    {
      id: 1,
      category: "travel",
      title: "Switch to Public Transport",
      description: "Use bus or train for your daily commute instead of driving alone",
      impact: 15.5,
      priority: "high",
      icon: Car,
      color: "#3b82f6",
    },
    {
      id: 2,
      category: "energy",
      title: "Reduce AC Usage",
      description: "Set AC temperature to 24°C and reduce usage by 2 hours daily",
      impact: 12.3,
      priority: "high",
      icon: Zap,
      color: "#f59e0b",
    },
    {
      id: 3,
      category: "energy",
      title: "Switch to LED Bulbs",
      description: "Replace all incandescent bulbs with energy-efficient LED bulbs",
      impact: 8.7,
      priority: "medium",
      icon: Zap,
      color: "#f59e0b",
    },
    {
      id: 4,
      category: "water",
      title: "Take Shorter Showers",
      description: "Reduce shower time from 10 minutes to 5 minutes",
      impact: 6.2,
      priority: "medium",
      icon: Droplet,
      color: "#06b6d4",
    },
    {
      id: 5,
      category: "waste",
      title: "Use Reusable Bags",
      description: "Bring your own bags when shopping to reduce plastic waste",
      impact: 4.5,
      priority: "medium",
      icon: Trash2,
      color: "#ef4444",
    },
    {
      id: 6,
      category: "energy",
      title: "Unplug Devices When Not in Use",
      description: "Reduce phantom power consumption by unplugging chargers and appliances",
      impact: 5.8,
      priority: "low",
      icon: Zap,
      color: "#f59e0b",
    },
    {
      id: 7,
      category: "water",
      title: "Fix Water Leaks",
      description: "Repair all dripping taps and running toilets to save water",
      impact: 7.1,
      priority: "high",
      icon: Droplet,
      color: "#06b6d4",
    },
    {
      id: 8,
      category: "waste",
      title: "Compost Organic Waste",
      description: "Start composting kitchen scraps and yard waste",
      impact: 9.2,
      priority: "medium",
      icon: Trash2,
      color: "#ef4444",
    },
    {
      id: 9,
      category: "travel",
      title: "Carpool When Possible",
      description: "Share rides with colleagues or neighbors going the same direction",
      impact: 11.4,
      priority: "high",
      icon: Car,
      color: "#3b82f6",
    },
    {
      id: 10,
      category: "energy",
      title: "Use Natural Light",
      description: "Open curtains during daytime to reduce artificial lighting needs",
      impact: 3.2,
      priority: "low",
      icon: Zap,
      color: "#f59e0b",
    },
  ];

  const filteredRecommendations =
    filter === "all"
      ? recommendations
      : recommendations.filter((rec) => rec.category === filter);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return { bg: "bg-red-50", text: "text-red-600", border: "border-red-200" };
      case "medium":
        return { bg: "bg-yellow-50", text: "text-yellow-600", border: "border-yellow-200" };
      case "low":
        return { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" };
      default:
        return { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200" };
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">AI-Powered Recommendations</h1>
        <p className="text-gray-600">
          Personalized suggestions to reduce your environmental impact
        </p>
      </div>

      {/* Filter Buttons */}
      <Card>
        <div className="flex items-center gap-3 flex-wrap">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Filter by:</span>
          <div className="flex gap-2 flex-wrap">
            {[
              { value: "all", label: "All", icon: Leaf },
              { value: "travel", label: "Travel", icon: Car },
              { value: "energy", label: "Energy", icon: Zap },
              { value: "water", label: "Water", icon: Droplet },
              { value: "waste", label: "Waste", icon: Trash2 },
            ].map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                    filter === option.value
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-200 hover:border-gray-300 text-gray-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="text-center">
            <div className="text-4xl mb-2">📋</div>
            <p className="text-3xl font-bold text-gray-900">{recommendations.length}</p>
            <p className="text-sm text-gray-600 mt-1">Total Recommendations</p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
          <div className="text-center">
            <div className="text-4xl mb-2">⚡</div>
            <p className="text-3xl font-bold text-gray-900">
              {recommendations.filter((r) => r.priority === "high").length}
            </p>
            <p className="text-sm text-gray-600 mt-1">High Priority Items</p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <div className="text-center">
            <div className="text-4xl mb-2">🌱</div>
            <p className="text-3xl font-bold text-gray-900">
              {recommendations.reduce((sum, r) => sum + r.impact, 0).toFixed(1)}
            </p>
            <p className="text-sm text-gray-600 mt-1">Total CO₂ Savings (kg/month)</p>
          </div>
        </Card>
      </div>

      {/* Recommendations List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRecommendations.map((rec) => {
          const Icon = rec.icon;
          const priorityColors = getPriorityColor(rec.priority);
          return (
            <Card
              key={rec.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: rec.color + "20" }}
                >
                  <Icon className="w-6 h-6" style={{ color: rec.color }} />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{rec.title}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${priorityColors.bg} ${priorityColors.text} ${priorityColors.border}`}
                    >
                      {rec.priority.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{rec.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-semibold text-green-600">
                        Save {rec.impact} kg CO₂/month
                      </span>
                    </div>
                    <Button size="sm">Apply</Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredRecommendations.length === 0 && (
        <Card className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No recommendations found
          </h3>
          <p className="text-gray-600">Try selecting a different filter</p>
        </Card>
      )}

      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl flex-shrink-0">
            💡
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Potential Annual Impact
            </h3>
            <p className="text-gray-700">
              By implementing all recommendations, you could save approximately{" "}
              <strong className="text-green-600">
                {(recommendations.reduce((sum, r) => sum + r.impact, 0) * 12).toFixed(0)} kg CO₂
              </strong>{" "}
              per year. That's equivalent to planting{" "}
              <strong className="text-green-600">
                {Math.round((recommendations.reduce((sum, r) => sum + r.impact, 0) * 12) / 20)} trees
              </strong>
              !
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
