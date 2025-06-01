import { useState, useEffect } from "react";

import { fetchStreams, fetchAlerts, loginUser, logoutUser } from "../utils";
import LoginForm from "../components/LoginForm";
import Sidebar from "../components/Sidebar";
import StreamsView from "../components/StreamView";
import AlertsView from "../components/AlertView";
import SettingsView from "../components/SettingsView";

const Dashboard = () => {
  const [user, setUser] = useState(true);
  const [loginError, setLoginError] = useState(null);

  const [streams, setStreams] = useState([]);
  const [selectedStream, setSelectedStream] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loadingStreams, setLoadingStreams] = useState(true);
  const [loadingAlerts, setLoadingAlerts] = useState(true);
  const [error, setError] = useState(null);

  const [view, setView] = useState("streams");

  useEffect(() => {
    if (user) {
      loadStreams();
      loadAlerts();
    }
  }, [user]);

  const loadStreams = async () => {
    setLoadingStreams(true);
    try {
      const data = await fetchStreams();
      setStreams(data);
      if (data.length > 0) setSelectedStream(data[0]);
    } catch (err) {
      setError("Failed to load streams");
    }
    setLoadingStreams(false);
  };

  const loadAlerts = async () => {
    setLoadingAlerts(true);
    try {
      const data = await fetchAlerts();
      setAlerts(data);
    } catch (err) {
      setError("Failed to load alerts");
    }
    setLoadingAlerts(false);
  };

  const handleLogin = async (username, password) => {
    try {
      const loggedInUser = await loginUser(username, password);
      setUser(loggedInUser);
      setLoginError(null);
    } catch (err) {
      setLoginError("Invalid username or password");
    }
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
  };

  const addStream = (stream) => {
    setStreams((prev) => [...prev, stream]);
    if (!selectedStream) setSelectedStream(stream);
  };

  const handleSelectStream = (stream) => {
    setSelectedStream(stream);
    console.log("SELECTED",stream);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-900">
        <LoginForm onLogin={handleLogin} error={loginError} />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-zinc-900 text-white">
      <Sidebar view={view} setView={setView} onLogout={handleLogout} />
      <main className="flex-1 overflow-auto">
        {view === "streams" && (
          <StreamsView
            streams={streams}
            selectedStream={selectedStream}
            onSelectStream={handleSelectStream}
            addStream={addStream}
            loadingStreams={loadingStreams}
            error={error}
          />
        )}
        {view === "alerts" && <AlertsView alerts={alerts} loadingAlerts={loadingAlerts} />}
        {view === "settings" && <SettingsView />}
      </main>
    </div>
  );
};

export default Dashboard;
