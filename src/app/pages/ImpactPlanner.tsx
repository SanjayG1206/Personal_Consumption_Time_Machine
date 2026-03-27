import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { CheckCircle2, Circle } from "lucide-react";
import * as Progress from "@radix-ui/react-progress";

export const ImpactPlanner = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyTargets = [
    { month: "January", target: 150, achieved: 145, percentage: 97 },
    { month: "February", target: 140, achieved: 138, percentage: 99 },
    { month: "March", target: 130, achieved: 95, percentage: 73 },
    { month: "April", target: 120, achieved: 0, percentage: 0 },
    { month: "May", target: 110, achieved: 0, percentage: 0 },
    { month: "June", target: 100, achieved: 0, percentage: 0 },
  ];

  const actions = [
    { id: 1, text: "Plant 5 trees", completed: true, impact: "20 kg CO₂/year" },
    { id: 2, text: "Use public transport 3x/week", completed: true, impact: "15 kg CO₂/month" },
    { id: 3, text: "Switch to LED bulbs", completed: true, impact: "10 kg CO₂/month" },
    { id: 4, text: "Reduce meat consumption", completed: false, impact: "25 kg CO₂/month" },
    { id: 5, text: "Install solar water heater", completed: false, impact: "30 kg CO₂/month" },
    { id: 6, text: "Use reusable shopping bags", completed: true, impact: "5 kg CO₂/month" },
    { id: 7, text: "Compost organic waste", completed: false, impact: "12 kg CO₂/month" },
    { id: 8, text: "Fix water leaks", completed: false, impact: "8 kg CO₂/month" },
  ];

  const completedActions = actions.filter((a) => a.completed).length;
  const totalActions = actions.length;
  const completionPercentage = Math.round((completedActions / totalActions) * 100);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Impact Payback Planner</h1>
        <p className="text-gray-600">Track your monthly targets and action items to achieve your goals</p>
      </div>

      {/* Overall Progress */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Overall Progress</h2>
            <p className="text-gray-600">
              {completedActions} of {totalActions} actions completed
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-green-600">{completionPercentage}%</div>
            <p className="text-sm text-gray-600">Complete</p>
          </div>
        </div>
        <Progress.Root className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <Progress.Indicator
            className="h-full bg-gradient-to-r from-green-400 to-emerald-600 transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </Progress.Root>
      </Card>

      {/* Timeline */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">2026 Timeline</h3>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200"></div>
          <div
            className="absolute top-8 left-0 h-1 bg-gradient-to-r from-green-400 to-emerald-600 transition-all duration-500"
            style={{ width: "25%" }}
          ></div>

          {/* Timeline points */}
          <div className="relative grid grid-cols-12 gap-2">
            {months.map((month, index) => {
              const isActive = index < 3;
              const isCurrent = index === 2;
              return (
                <div key={month} className="text-center">
                  <div
                    className={`w-4 h-4 rounded-full mx-auto mb-2 ${
                      isActive
                        ? "bg-green-500"
                        : isCurrent
                        ? "bg-green-500 ring-4 ring-green-200"
                        : "bg-gray-300"
                    }`}
                  ></div>
                  <p className="text-xs text-gray-600">{month}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Monthly Targets */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Targets</h3>
        <div className="space-y-4">
          {monthlyTargets.map((target, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-medium text-gray-900">{target.month}</span>
                  <span className="text-sm text-gray-600 ml-2">
                    {target.achieved > 0 && `${target.achieved}/${target.target} kg CO₂`}
                    {target.achieved === 0 && `Target: ${target.target} kg CO₂`}
                  </span>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    target.percentage >= 90
                      ? "text-green-600"
                      : target.percentage >= 50
                      ? "text-yellow-600"
                      : target.percentage > 0
                      ? "text-red-600"
                      : "text-gray-400"
                  }`}
                >
                  {target.percentage > 0 ? `${target.percentage}%` : "Not started"}
                </span>
              </div>
              <Progress.Root className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <Progress.Indicator
                  className={`h-full transition-all duration-500 ${
                    target.percentage >= 90
                      ? "bg-green-500"
                      : target.percentage >= 50
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${target.percentage}%` }}
                />
              </Progress.Root>
            </div>
          ))}
        </div>
      </Card>

      {/* Action Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Completed Actions */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">✅ Completed Actions</h3>
            <span className="text-sm text-green-600 font-medium">{completedActions} done</span>
          </div>
          <div className="space-y-3">
            {actions
              .filter((action) => action.completed)
              .map((action) => (
                <div
                  key={action.id}
                  className="flex items-start gap-3 p-3 bg-green-50 rounded-lg"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 line-through">{action.text}</p>
                    <p className="text-xs text-green-600 font-medium mt-1">{action.impact}</p>
                  </div>
                </div>
              ))}
          </div>
        </Card>

        {/* Pending Actions */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">⏳ Pending Actions</h3>
            <span className="text-sm text-gray-600 font-medium">
              {totalActions - completedActions} remaining
            </span>
          </div>
          <div className="space-y-3">
            {actions
              .filter((action) => !action.completed)
              .map((action) => (
                <div
                  key={action.id}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <Circle className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{action.text}</p>
                    <p className="text-xs text-gray-600 font-medium mt-1">{action.impact}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Mark Done
                  </Button>
                </div>
              ))}
          </div>
        </Card>
      </div>

      {/* Impact Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl">
            🎯
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Projected Annual Impact</h3>
            <p className="text-gray-700">
              By completing all actions, you could reduce your carbon footprint by approximately{" "}
              <strong className="text-blue-600">1,450 kg CO₂</strong> per year - equivalent to
              planting <strong className="text-blue-600">73 trees</strong>!
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
