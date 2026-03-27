import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { useSustainability } from "../context/SustainabilityContext";
import { Trophy, Target, Calendar, TrendingUp } from "lucide-react";
import * as Progress from "@radix-ui/react-progress";

export const Goals = () => {
  const { goals } = useSustainability();

  const achievements = [
    {
      id: 1,
      title: "First Step",
      description: "Logged your first data entry",
      icon: "🎯",
      earned: true,
      date: "March 15, 2026",
    },
    {
      id: 2,
      title: "Eco Warrior",
      description: "Maintained a 70+ eco score for 7 days",
      icon: "🌟",
      earned: true,
      date: "March 20, 2026",
    },
    {
      id: 3,
      title: "Public Transport Champion",
      description: "Used public transport 10 times",
      icon: "🚌",
      earned: true,
      date: "March 25, 2026",
    },
    {
      id: 4,
      title: "Water Saver",
      description: "Reduced water usage by 20%",
      icon: "💧",
      earned: false,
      date: null,
    },
    {
      id: 5,
      title: "Carbon Crusher",
      description: "Reduced carbon footprint by 50%",
      icon: "🌍",
      earned: false,
      date: null,
    },
    {
      id: 6,
      title: "Consistency King",
      description: "Log data for 30 consecutive days",
      icon: "👑",
      earned: false,
      date: null,
    },
  ];

  const earnedCount = achievements.filter((a) => a.earned).length;
  const totalCount = achievements.length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Goals & Progress</h1>
        <p className="text-gray-600">Track your sustainability goals and earn achievements</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <div className="flex items-center gap-3">
            <Target className="w-12 h-12 text-blue-600" />
            <div>
              <p className="text-3xl font-bold text-gray-900">{goals.length}</p>
              <p className="text-sm text-gray-600">Active Goals</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-12 h-12 text-green-600" />
            <div>
              <p className="text-3xl font-bold text-gray-900">
                {goals.filter((g) => (g.current / g.target) * 100 >= 50).length}
              </p>
              <p className="text-sm text-gray-600">On Track</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
          <div className="flex items-center gap-3">
            <Trophy className="w-12 h-12 text-yellow-600" />
            <div>
              <p className="text-3xl font-bold text-gray-900">{earnedCount}</p>
              <p className="text-sm text-gray-600">Achievements Earned</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Active Goals */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Your Active Goals</h3>
          <Button size="sm">+ Add New Goal</Button>
        </div>
        <div className="space-y-4">
          {goals.map((goal) => {
            const percentage = Math.min((goal.current / goal.target) * 100, 100);
            const isOnTrack = percentage >= 50;
            const deadline = new Date(goal.deadline);
            const daysLeft = Math.ceil(
              (deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
            );

            return (
              <div
                key={goal.id}
                className={`p-4 rounded-lg border-2 ${
                  isOnTrack
                    ? "bg-green-50 border-green-200"
                    : "bg-yellow-50 border-yellow-200"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{goal.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        <span>
                          {goal.current} / {goal.target} {goal.unit}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{daysLeft} days left</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-2xl font-bold ${
                        isOnTrack ? "text-green-600" : "text-yellow-600"
                      }`}
                    >
                      {Math.round(percentage)}%
                    </div>
                    <p className="text-xs text-gray-600">Complete</p>
                  </div>
                </div>
                <Progress.Root className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <Progress.Indicator
                    className={`h-full transition-all duration-500 ${
                      isOnTrack
                        ? "bg-gradient-to-r from-green-400 to-emerald-600"
                        : "bg-gradient-to-r from-yellow-400 to-orange-500"
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </Progress.Root>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Achievement Badges */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">🏆 Achievements</h3>
          <span className="text-sm text-gray-600">
            {earnedCount} of {totalCount} earned
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border-2 text-center transition-all ${
                achievement.earned
                  ? "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-300 shadow-md"
                  : "bg-gray-50 border-gray-200 opacity-60"
              }`}
            >
              <div className="text-4xl mb-2 filter grayscale-0">
                {achievement.earned ? achievement.icon : "🔒"}
              </div>
              <p className="text-xs font-semibold text-gray-900 mb-1">{achievement.title}</p>
              <p className="text-xs text-gray-600">{achievement.description}</p>
              {achievement.earned && achievement.date && (
                <p className="text-xs text-green-600 mt-2 font-medium">
                  Earned: {new Date(achievement.date).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Progress Summary */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-3xl">
            📊
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Overall Progress</h3>
            <p className="text-gray-700">
              You're making great progress! Keep up the good work. You're currently on track with{" "}
              <strong className="text-purple-600">
                {goals.filter((g) => (g.current / g.target) * 100 >= 50).length} out of{" "}
                {goals.length}
              </strong>{" "}
              goals, and you've earned{" "}
              <strong className="text-purple-600">
                {earnedCount} achievement{earnedCount !== 1 ? "s" : ""}
              </strong>
              .
            </p>
          </div>
        </div>
      </Card>

      {/* Motivation Card */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <div className="text-center py-4">
          <div className="text-5xl mb-3">🌱</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Keep Growing!</h3>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Every small action counts. Your efforts today are creating a better tomorrow. Stay
            committed to your goals and watch your positive impact grow!
          </p>
        </div>
      </Card>
    </div>
  );
};
