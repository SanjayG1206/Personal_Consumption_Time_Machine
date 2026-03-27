import { useState } from "react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { useSustainability } from "../context/SustainabilityContext";
import { useNavigate } from "react-router";
import { Car, Zap, Droplet, Trash2, Check } from "lucide-react";
import * as Tabs from "@radix-ui/react-tabs";
import * as Slider from "@radix-ui/react-slider";

export const DataEntry = () => {
  const { addDataEntry } = useSustainability();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("travel");
  const [showSuccess, setShowSuccess] = useState(false);

  // Travel state
  const [travelDistance, setTravelDistance] = useState(10);
  const [travelMode, setTravelMode] = useState("car");

  // Energy state
  const [energyUsage, setEnergyUsage] = useState(15);
  const [energyAppliance, setEnergyAppliance] = useState("ac");

  // Water state
  const [waterUsage, setWaterUsage] = useState(100);

  // Waste state
  const [wasteAmount, setWasteAmount] = useState(2);
  const [wasteType, setWasteType] = useState("plastic");

  const calculateEmissions = () => {
    switch (activeTab) {
      case "travel":
        const factors: { [key: string]: number } = {
          car: 0.21,
          bus: 0.05,
          train: 0.03,
          bike: 0,
        };
        return travelDistance * factors[travelMode];
      case "energy":
        return energyUsage * 0.5;
      case "water":
        return waterUsage * 0.002;
      case "waste":
        const wasteFactor = wasteType === "plastic" ? 0.7 : 0.3;
        return wasteAmount * wasteFactor;
      default:
        return 0;
    }
  };

  const handleSubmit = () => {
    const emissions = calculateEmissions();
    let value = 0;
    let unit = "";
    let details = "";

    switch (activeTab) {
      case "travel":
        value = travelDistance;
        unit = "km";
        details = `${travelMode} commute`;
        break;
      case "energy":
        value = energyUsage;
        unit = "kWh";
        details = energyAppliance;
        break;
      case "water":
        value = waterUsage;
        unit = "liters";
        details = "Daily usage";
        break;
      case "waste":
        value = wasteAmount;
        unit = "kg";
        details = `${wasteType} waste`;
        break;
    }

    addDataEntry({
      date: new Date().toISOString().split("T")[0],
      category: activeTab as any,
      value,
      unit,
      details,
      emissions,
    });

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate("/");
    }, 2000);
  };

  const emissions = calculateEmissions();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Add Your Data</h1>
        <p className="text-gray-600">Track your daily sustainability metrics across different categories</p>
      </div>

      <Card>
        <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
          <Tabs.List className="flex gap-2 p-1 bg-gray-100 rounded-lg mb-6">
            <Tabs.Trigger
              value="travel"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
            >
              <Car className="w-4 h-4" />
              <span>Travel</span>
            </Tabs.Trigger>
            <Tabs.Trigger
              value="energy"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
            >
              <Zap className="w-4 h-4" />
              <span>Energy</span>
            </Tabs.Trigger>
            <Tabs.Trigger
              value="water"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
            >
              <Droplet className="w-4 h-4" />
              <span>Water</span>
            </Tabs.Trigger>
            <Tabs.Trigger
              value="waste"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
            >
              <Trash2 className="w-4 h-4" />
              <span>Waste</span>
            </Tabs.Trigger>
          </Tabs.List>

          {/* Travel Tab */}
          <Tabs.Content value="travel" className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Travel Mode
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: "car", label: "Car", icon: "🚗" },
                  { value: "bus", label: "Bus", icon: "🚌" },
                  { value: "train", label: "Train", icon: "🚆" },
                  { value: "bike", label: "Bike", icon: "🚴" },
                ].map((mode) => (
                  <button
                    key={mode.value}
                    onClick={() => setTravelMode(mode.value)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      travelMode === mode.value
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-2xl mb-2">{mode.icon}</div>
                    <div className="text-sm font-medium text-gray-900">{mode.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Distance: {travelDistance} km
              </label>
              <Slider.Root
                value={[travelDistance]}
                onValueChange={(value) => setTravelDistance(value[0])}
                max={100}
                step={1}
                className="relative flex items-center w-full h-5"
              >
                <Slider.Track className="relative bg-gray-200 rounded-full h-2 flex-grow">
                  <Slider.Range className="absolute bg-gradient-to-r from-green-400 to-emerald-600 rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-green-500 rounded-full shadow-md hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500" />
              </Slider.Root>
            </div>
          </Tabs.Content>

          {/* Energy Tab */}
          <Tabs.Content value="energy" className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Appliance
              </label>
              <select
                value={energyAppliance}
                onChange={(e) => setEnergyAppliance(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              >
                <option value="ac">Air Conditioner</option>
                <option value="heater">Heater</option>
                <option value="lights">Lights</option>
                <option value="computer">Computer</option>
                <option value="refrigerator">Refrigerator</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Energy Usage: {energyUsage} kWh
              </label>
              <Slider.Root
                value={[energyUsage]}
                onValueChange={(value) => setEnergyUsage(value[0])}
                max={50}
                step={1}
                className="relative flex items-center w-full h-5"
              >
                <Slider.Track className="relative bg-gray-200 rounded-full h-2 flex-grow">
                  <Slider.Range className="absolute bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-orange-500 rounded-full shadow-md hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </Slider.Root>
            </div>
          </Tabs.Content>

          {/* Water Tab */}
          <Tabs.Content value="water" className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Water Usage: {waterUsage} liters
              </label>
              <Slider.Root
                value={[waterUsage]}
                onValueChange={(value) => setWaterUsage(value[0])}
                max={500}
                step={10}
                className="relative flex items-center w-full h-5"
              >
                <Slider.Track className="relative bg-gray-200 rounded-full h-2 flex-grow">
                  <Slider.Range className="absolute bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-cyan-500 rounded-full shadow-md hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              </Slider.Root>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Tip:</strong> Average daily water usage is around 150-200 liters per person.
                Consider taking shorter showers and fixing leaks to reduce usage.
              </p>
            </div>
          </Tabs.Content>

          {/* Waste Tab */}
          <Tabs.Content value="waste" className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Waste Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "plastic", label: "Plastic", icon: "♻️" },
                  { value: "organic", label: "Organic", icon: "🌱" },
                ].map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setWasteType(type.value)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      wasteType === type.value
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-2xl mb-2">{type.icon}</div>
                    <div className="text-sm font-medium text-gray-900">{type.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Waste Amount: {wasteAmount} kg
              </label>
              <Slider.Root
                value={[wasteAmount]}
                onValueChange={(value) => setWasteAmount(value[0])}
                max={10}
                step={0.5}
                className="relative flex items-center w-full h-5"
              >
                <Slider.Track className="relative bg-gray-200 rounded-full h-2 flex-grow">
                  <Slider.Range className="absolute bg-gradient-to-r from-red-400 to-pink-500 rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-red-500 rounded-full shadow-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500" />
              </Slider.Root>
            </div>
          </Tabs.Content>
        </Tabs.Root>

        {/* Real-time Emission Preview */}
        <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Estimated CO₂ Emissions</p>
              <p className="text-2xl font-bold text-gray-900">
                {emissions.toFixed(2)} <span className="text-lg font-normal text-gray-600">kg CO₂</span>
              </p>
            </div>
            <div className="text-4xl">🌍</div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex gap-3">
          <Button onClick={handleSubmit} className="flex-1" disabled={showSuccess}>
            {showSuccess ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Added Successfully!
              </>
            ) : (
              "Submit Data"
            )}
          </Button>
          <Button variant="outline" onClick={() => navigate("/")}>
            Cancel
          </Button>
        </div>
      </Card>

      {/* Success Animation */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Data Added!</h3>
            <p className="text-gray-600">Redirecting to dashboard...</p>
          </div>
        </div>
      )}
    </div>
  );
};
