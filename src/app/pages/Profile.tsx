import { useState } from "react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { User, Mail, MapPin, Calendar, Sun, Moon, Trash2 } from "lucide-react";
import { useTheme } from "next-themes";
import * as Switch from "@radix-ui/react-switch";

export const Profile = () => {
  const { theme, setTheme } = useTheme();
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [location, setLocation] = useState("San Francisco, CA");
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile Settings</h1>
        <p className="text-gray-600">Manage your account preferences and settings</p>
      </div>

      {/* Profile Info */}
      <Card>
        <div className="flex items-center gap-6 mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-3xl font-bold">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{name}</h2>
            <p className="text-gray-600">{email}</p>
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>Member since March 2026</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button>Save Changes</Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </div>
      </Card>

      {/* Preferences */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>
        <div className="space-y-4">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              {theme === "dark" ? (
                <Moon className="w-6 h-6 text-gray-700" />
              ) : (
                <Sun className="w-6 h-6 text-yellow-600" />
              )}
              <div>
                <p className="font-medium text-gray-900">Theme</p>
                <p className="text-sm text-gray-600">
                  {theme === "dark" ? "Dark mode" : "Light mode"}
                </p>
              </div>
            </div>
            <Switch.Root
              checked={theme === "dark"}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              className="w-11 h-6 bg-gray-300 rounded-full relative data-[state=checked]:bg-green-500 transition-colors"
            >
              <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
            </Switch.Root>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Push Notifications</p>
              <p className="text-sm text-gray-600">Receive alerts about your sustainability goals</p>
            </div>
            <Switch.Root
              checked={notifications}
              onCheckedChange={setNotifications}
              className="w-11 h-6 bg-gray-300 rounded-full relative data-[state=checked]:bg-green-500 transition-colors"
            >
              <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
            </Switch.Root>
          </div>

          {/* Email Updates */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Email Updates</p>
              <p className="text-sm text-gray-600">Receive weekly sustainability reports via email</p>
            </div>
            <Switch.Root
              checked={emailUpdates}
              onCheckedChange={setEmailUpdates}
              className="w-11 h-6 bg-gray-300 rounded-full relative data-[state=checked]:bg-green-500 transition-colors"
            >
              <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
            </Switch.Root>
          </div>
        </div>
      </Card>

      {/* Statistics */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Impact Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-3xl mb-2">🌱</div>
            <p className="text-2xl font-bold text-gray-900">145 kg</p>
            <p className="text-sm text-gray-600">CO₂ Reduced This Month</p>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-3xl mb-2">💧</div>
            <p className="text-2xl font-bold text-gray-900">2,340 L</p>
            <p className="text-sm text-gray-600">Water Saved This Month</p>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="text-3xl mb-2">⚡</div>
            <p className="text-2xl font-bold text-gray-900">324 kWh</p>
            <p className="text-sm text-gray-600">Energy Tracked This Month</p>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
            <div>
              <p className="font-medium text-gray-900">Reset All Data</p>
              <p className="text-sm text-gray-600">
                Permanently delete all your tracked data and reset your account
              </p>
            </div>
            <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
              <Trash2 className="w-4 h-4 mr-2" />
              Reset Data
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
            <div>
              <p className="font-medium text-gray-900">Delete Account</p>
              <p className="text-sm text-gray-600">
                Permanently delete your account and all associated data
              </p>
            </div>
            <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
              Delete Account
            </Button>
          </div>
        </div>
      </Card>

      {/* App Info */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <div className="text-center">
          <div className="text-4xl mb-3">🌍</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Personal Sustainability Time-Machine
          </h3>
          <p className="text-sm text-gray-600 mb-1">Version 1.0.0</p>
          <p className="text-xs text-gray-500">
            © 2026 EcoTracker. All rights reserved.
          </p>
        </div>
      </Card>
    </div>
  );
};
