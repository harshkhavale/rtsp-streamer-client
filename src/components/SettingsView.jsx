import React, { useState } from 'react';
import { Switch } from '@headlessui/react';

export default function SettingsView() {
  const [threshold, setThreshold] = useState(0.8);
  const [cooldown, setCooldown] = useState(30);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleSave = () => {
    // Replace with your API call
    const settings = {
      confidenceThreshold: threshold,
      alertCooldown: cooldown,
      notifications: notificationsEnabled,
    };
    console.log("Saving settings:", settings);
    alert("Settings saved successfully!");
  };

  return (
    <div className="max-w-xl bg-gray-900 border shadow-lg mt-20 mx-10 md:mx-auto rounded-2xl p-6 m-4 space-y-6">
      <h2 className="text-2xl font-bold  mb-4">Admin Settings Panel</h2>

      {/* Confidence Threshold */}
      <div className="space-y-2">
        <label className="block text-sm font-medium black">
          Confidence Threshold ({Math.round(threshold * 100)}%)
        </label>
        <input
          type="range"
          min="0.0"
          max="1.0"
          step="0.01"
          value={threshold}
          onChange={(e) => setThreshold(parseFloat(e.target.value))}
          className="w-full accent-blue-600"
        />
      </div>

      {/* Cooldown Period */}
      <div className="space-y-2">
        <label className="block text-sm font-medium black">
          Alert Cooldown (seconds)
        </label>
        <input
          type="number"
          min="5"
          step="5"
          value={cooldown}
          onChange={(e) => setCooldown(parseInt(e.target.value))}
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />
      </div>

      {/* Notification Toggle */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium black">Enable Browser Notifications</span>
        <Switch
          checked={notificationsEnabled}
          onChange={setNotificationsEnabled}
          className={`${
            notificationsEnabled ? 'bg-blue-500' : 'bg-blue-300'
          } relative inline-flex items-center h-6 rounded-full w-11 transition`}
        >
          <span
            className={`${
              notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block w-4 h-4 transform bg-white rounded-full transition`}
          />
        </Switch>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      >
        Save Settings
      </button>
    </div>
  );
}
