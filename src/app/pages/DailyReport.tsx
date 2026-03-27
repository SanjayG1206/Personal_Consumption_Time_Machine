import { Card } from "../components/ui/Card";
import { CheckCircle2, XCircle, TrendingUp, TrendingDown } from "lucide-react";
import { ProgressCircle } from "../components/ui/ProgressCircle";

export const DailyReport = () => {
  const todayScore = 68;
  const yesterdayScore = 72;
  const scoreChange = todayScore - yesterdayScore;

  const goodActions = [
    {
      id: 1,
      action: "Used public transport for commute",
      time: "8:00 AM",
      impact: "Saved 5.2 kg CO₂",
      category: "travel",
    },
    {
      id: 2,
      action: "Turned off AC during moderate weather",
      time: "2:00 PM",
      impact: "Saved 3.5 kWh",
      category: "energy",
    },
    {
      id: 3,
      action: "Used reusable water bottle",
      time: "Throughout day",
      impact: "Avoided 0.5 kg plastic waste",
      category: "waste",
    },
  ];

  const mistakes = [
    {
      id: 1,
      mistake: "Left lights on in unused rooms",
      time: "11:00 AM - 3:00 PM",
      impact: "Wasted 2.0 kWh",
      category: "energy",
    },
    {
      id: 2,
      mistake: "Took a 15-minute shower",
      time: "7:00 AM",
      impact: "Used 225 liters of water",
      category: "water",
    },
  ];

  const suggestions = [
    "Consider installing motion sensors for lights to avoid forgetting them on",
    "Set a timer for showers to stay within 5-7 minutes",
    "Great job using public transport! Try to maintain this habit",
    "Keep using your reusable bottle - you're making a real difference",
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Today's Summary</h1>
        <p className="text-gray-600">Friday, March 27, 2026</p>
      </div>

      {/* Daily Score */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Your Daily Eco Score</h2>
            <div className="flex items-center gap-2 mb-4">
              {scoreChange < 0 ? (
                <>
                  <TrendingDown className="w-5 h-5 text-red-600" />
                  <span className="text-red-600 font-medium">
                    {Math.abs(scoreChange)} points lower than yesterday
                  </span>
                </>
              ) : scoreChange > 0 ? (
                <>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-green-600 font-medium">
                    {scoreChange} points higher than yesterday
                  </span>
                </>
              ) : (
                <span className="text-gray-600 font-medium">Same as yesterday</span>
              )}
            </div>
            <p className="text-gray-600">
              You had {goodActions.length} good actions and {mistakes.length} areas for improvement
              today.
            </p>
          </div>
          <div>
            <ProgressCircle
              value={todayScore}
              max={100}
              size={160}
              strokeWidth={12}
              color="#10b981"
            />
          </div>
        </div>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center bg-green-50 border-green-200">
          <div className="text-3xl mb-2">✅</div>
          <p className="text-3xl font-bold text-gray-900">{goodActions.length}</p>
          <p className="text-sm text-gray-600 mt-1">Good Actions</p>
        </Card>

        <Card className="text-center bg-red-50 border-red-200">
          <div className="text-3xl mb-2">❌</div>
          <p className="text-3xl font-bold text-gray-900">{mistakes.length}</p>
          <p className="text-sm text-gray-600 mt-1">Mistakes</p>
        </Card>

        <Card className="text-center bg-blue-50 border-blue-200">
          <div className="text-3xl mb-2">🌍</div>
          <p className="text-3xl font-bold text-gray-900">8.7</p>
          <p className="text-sm text-gray-600 mt-1">kg CO₂ Saved</p>
        </Card>

        <Card className="text-center bg-purple-50 border-purple-200">
          <div className="text-3xl mb-2">💧</div>
          <p className="text-3xl font-bold text-gray-900">75</p>
          <p className="text-sm text-gray-600 mt-1">Liters Saved</p>
        </Card>
      </div>

      {/* Good Actions */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">✅ Good Actions Today</h3>
          <span className="text-sm text-green-600 font-medium">
            {goodActions.length} achievements
          </span>
        </div>
        <div className="space-y-3">
          {goodActions.map((action) => (
            <div
              key={action.id}
              className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200"
            >
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <p className="font-medium text-gray-900">{action.action}</p>
                  <span className="text-xs text-gray-500">{action.time}</span>
                </div>
                <p className="text-sm text-green-600 font-medium">{action.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Mistakes */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">❌ Areas for Improvement</h3>
          <span className="text-sm text-red-600 font-medium">{mistakes.length} issues</span>
        </div>
        <div className="space-y-3">
          {mistakes.map((mistake) => (
            <div
              key={mistake.id}
              className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200"
            >
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <p className="font-medium text-gray-900">{mistake.mistake}</p>
                  <span className="text-xs text-gray-500">{mistake.time}</span>
                </div>
                <p className="text-sm text-red-600 font-medium">{mistake.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Suggestions */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          💡 Suggestions for Tomorrow
        </h3>
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-xs font-bold">{index + 1}</span>
              </div>
              <p className="text-sm text-gray-900">{suggestion}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Category Breakdown */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Impact by Category</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">🚗 Travel</span>
              <span className="text-xs text-green-600 font-bold">+15 points</span>
            </div>
            <div className="w-full bg-blue-200 h-2 rounded-full">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
            </div>
            <p className="text-xs text-gray-600 mt-1">Great choice using public transport!</p>
          </div>

          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">⚡ Energy</span>
              <span className="text-xs text-yellow-600 font-bold">-5 points</span>
            </div>
            <div className="w-full bg-orange-200 h-2 rounded-full">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "60%" }}></div>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Could improve - remember to turn off lights
            </p>
          </div>

          <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">💧 Water</span>
              <span className="text-xs text-red-600 font-bold">-8 points</span>
            </div>
            <div className="w-full bg-cyan-200 h-2 rounded-full">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: "45%" }}></div>
            </div>
            <p className="text-xs text-gray-600 mt-1">Long shower detected - try to reduce time</p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">♻️ Waste</span>
              <span className="text-xs text-green-600 font-bold">+10 points</span>
            </div>
            <div className="w-full bg-green-200 h-2 rounded-full">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: "90%" }}></div>
            </div>
            <p className="text-xs text-gray-600 mt-1">Excellent waste reduction!</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
