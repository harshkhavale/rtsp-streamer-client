import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoginForm from './pages/LoginForm'; // make sure the file exists
import { useSelector } from 'react-redux';
// import AlertsPage from './pages/AlertsPage'; // optional additional page

function App() {
const token = useSelector((state) => state.auth.token);
const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/alerts" element={<AlertsPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
