import { useState } from "react";
import {
  Podcast,
  Bell,
  Settings,
  LogOut,
  Video,
  Menu,
  X,
} from "lucide-react";

const Sidebar = ({ view, setView, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { key: "streams", label: "Streams", icon: <Video size={20} /> },
    { key: "alerts", label: "Alerts", icon: <Bell size={20} /> },
    { key: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Mobile Topbar with hamburger */}
      <div className="sm:hidden absolute top-0 w-full flex items-center justify-between bg-zinc-900 p-4 shadow-md">
        <button onClick={() => setIsOpen(true)} aria-label="Open menu">
          <Menu size={24} className="text-white" />
        </button>
        <h1 className="text-lg font-bold flex items-center gap-2 text-white">
          <Podcast size={24} />
          RTSP Dashboard
        </h1>
      </div>

      {/* Sidebar for desktop */}
      <aside className="hidden sm:flex flex-col w-64 bg-gray-900 border-r border-gray-700 p-4">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Podcast size={28} />
          RTSP Face Detection
        </h2>
        <nav className="flex flex-col gap-4 flex-grow">
          {navItems.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setView(key)}
              className={`flex items-center gap-2 px-3 py-2 rounded ${
                view === key
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </nav>
        <button
          onClick={onLogout}
          className="mt-auto flex items-center gap-2 px-3 py-2 rounded text-red-500 hover:bg-gray-800"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* Drawer overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } sm:hidden`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer sidebar on mobile */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-gray-900 z-50 p-4 flex flex-col sm:hidden transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
            <Podcast size={28} />
            RTSP Dashboard
          </h2>
          <button onClick={() => setIsOpen(false)} aria-label="Close menu">
            <X size={24} className="text-white" />
          </button>
        </div>
        <nav className="flex flex-col gap-4 flex-grow">
          {navItems.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => {
                setView(key);
                setIsOpen(false);
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded ${
                view === key
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </nav>
        <button
          onClick={() => {
            onLogout();
            setIsOpen(false);
          }}
          className="mt-auto flex items-center gap-2 px-3 py-2 rounded text-red-500 hover:bg-gray-800"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
