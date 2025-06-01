// SettingsView.jsx
import { Settings } from "lucide-react";

const SettingsView = () => (
  <section className="p-6 overflow-auto h-full">
    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
      <Settings size={28} />
      Settings
    </h2>
    {/* Add settings form here */}
    <p>Settings UI goes here...</p>
  </section>
);

export default SettingsView;
