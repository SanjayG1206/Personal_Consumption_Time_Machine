import { useState } from "react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Home, Zap, Sun, Wind, TrendingDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import * as Switch from "@radix-ui/react-switch";

export const DigitalTwin = () => {
  const [useSolar, setUseSolar] = useState(false);
  const [useEfficientAppliances, setUseEfficientAppliances] = useState(false);
  const [useLED, setUseLED] = useState(false);

  const baselineEnergy = 324;
  const solarSavings = useSolar ? 150 : 0;
  const applianceSavings = useEfficientAppliances ? 80 : 0;
  const ledSavings = useLED ? 30 : 0;

  const optimizedEnergy = baselineEnergy - solarSavings - applianceSavings - ledSavings;
  const totalSavings = solarSavings + applianceSavings + ledSavings;
  const efficiencyPercentage = Math.round((totalSavings / baselineEnergy) * 100);

  const comparisonData = [
    {
      name: "Heating",
      baseline: 120,
      optimized: useEfficientAppliances ? 80 : 120,
    },
    {
      name: "Cooling",
      baseline: 90,
      optimized: useEfficientAppliances ? 60 : 90,
    },
    {
      name: "Lighting",
      baseline: 45,
      optimized: useLED ? 15 : 45,
    },
    {
      name: "Appliances",
      baseline: 69,
      optimized: useEfficientAppliances ? 50 : 69,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Digital Twin Simulation</h1>
        <p className="text-gray-600">
          Visualize your home's energy profile and explore optimization scenarios
        </p>
      </div>

      {/* House Visualization */}
      <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-white rounded-2xl shadow-lg mb-4">
            <Home className="w-16 h-16 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Your Digital Home Twin</h2>
          <p className="text-gray-600">
            A virtual representation of your household's energy consumption
          </p>
        </div>
      </Card>

      {/* Energy Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Baseline */}
        <Card className="bg-red-50 border-red-200">
          <div className="text-center">
            <Zap className="w-12 h-12 text-red-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Baseline Energy</h3>
            <div className="text-5xl font-bold text-red-600 mb-2">{baselineEnergy}</div>
            <p className="text-sm text-gray-600">kWh/month</p>
            <div className="mt-4 p-3 bg-white rounded-lg">
              <p className="text-xs text-gray-600">Current monthly consumption</p>
            </div>
          </div>
        </Card>

        {/* Optimized */}
        <Card className="bg-green-50 border-green-200">
          <div className="text-center">
            <Sun className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Optimized Energy</h3>
            <div className="text-5xl font-bold text-green-600 mb-2">{optimizedEnergy}</div>
            <p className="text-sm text-gray-600">kWh/month</p>
            <div className="mt-4 p-3 bg-white rounded-lg">
              <p className="text-xs text-gray-600">
                With current optimizations: {totalSavings} kWh saved
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Efficiency Highlight */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingDown className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Energy Efficiency</h3>
              <p className="text-gray-600">Current optimization level</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold text-green-600">{efficiencyPercentage}%</div>
            <p className="text-sm text-gray-600 mt-1">More Efficient</p>
          </div>
        </div>
      </Card>

      {/* Toggle Scenarios */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Toggle Optimization Scenarios
        </h3>
        <div className="space-y-4">
          {/* Solar Panels */}
          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center gap-3">
              <Sun className="w-6 h-6 text-yellow-600" />
              <div>
                <p className="font-medium text-gray-900">Solar Panels</p>
                <p className="text-sm text-gray-600">Save 150 kWh/month (~46% reduction)</p>
              </div>
            </div>
            <Switch.Root
              checked={useSolar}
              onCheckedChange={setUseSolar}
              className="w-11 h-6 bg-gray-300 rounded-full relative data-[state=checked]:bg-green-500 transition-colors"
            >
              <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
            </Switch.Root>
          </div>

          {/* Efficient Appliances */}
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Energy-Efficient Appliances</p>
                <p className="text-sm text-gray-600">Save 80 kWh/month (~25% reduction)</p>
              </div>
            </div>
            <Switch.Root
              checked={useEfficientAppliances}
              onCheckedChange={setUseEfficientAppliances}
              className="w-11 h-6 bg-gray-300 rounded-full relative data-[state=checked]:bg-green-500 transition-colors"
            >
              <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
            </Switch.Root>
          </div>

          {/* LED Lighting */}
          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center gap-3">
              <Wind className="w-6 h-6 text-purple-600" />
              <div>
                <p className="font-medium text-gray-900">LED Lighting</p>
                <p className="text-sm text-gray-600">Save 30 kWh/month (~9% reduction)</p>
              </div>
            </div>
            <Switch.Root
              checked={useLED}
              onCheckedChange={setUseLED}
              className="w-11 h-6 bg-gray-300 rounded-full relative data-[state=checked]:bg-green-500 transition-colors"
            >
              <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
            </Switch.Root>
          </div>
        </div>
      </Card>

      {/* Comparison Chart */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Energy Breakdown: Baseline vs Optimized
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={comparisonData}>
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
            <Bar dataKey="baseline" fill="#ef4444" name="Baseline" radius={[8, 8, 0, 0]} />
            <Bar dataKey="optimized" fill="#10b981" name="Optimized" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Cost Savings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="text-3xl mb-2">💰</div>
          <p className="text-2xl font-bold text-gray-900">
            ${(totalSavings * 0.15).toFixed(0)}
          </p>
          <p className="text-sm text-gray-600 mt-1">Monthly Savings</p>
        </Card>

        <Card className="text-center bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <div className="text-3xl mb-2">📅</div>
          <p className="text-2xl font-bold text-gray-900">
            ${(totalSavings * 0.15 * 12).toFixed(0)}
          </p>
          <p className="text-sm text-gray-600 mt-1">Annual Savings</p>
        </Card>

        <Card className="text-center bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="text-3xl mb-2">🌍</div>
          <p className="text-2xl font-bold text-gray-900">
            {(totalSavings * 0.5).toFixed(0)}
          </p>
          <p className="text-sm text-gray-600 mt-1">kg CO₂ Saved/month</p>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Ready to optimize?</h3>
            <p className="text-sm text-gray-600">
              Start implementing these changes to reduce your energy consumption
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">Download Report</Button>
            <Button>Create Action Plan</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
