// AlertsView.jsx
import { AlertTriangle } from "lucide-react";
import AlertList from "../components/AlertList";

const AlertsView = ({ alerts, loadingAlerts }) => (
  <section className="p-6 overflow-auto h-full">
    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
      <AlertTriangle size={28} className="text-red-500" />
      Recent Alerts
    </h2>
    {loadingAlerts ? <p>Loading alerts...</p> : <AlertList alerts={alerts} />}
  </section>
);

export default AlertsView;
