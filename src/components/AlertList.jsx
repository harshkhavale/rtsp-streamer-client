import React from 'react';
import AlertCard from './AlertCard';

const AlertList = ({ alerts }) => {
  if (!alerts.length) return <p className="text-gray-500">No alerts yet</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {alerts.map((alert, idx) => (
        <AlertCard key={idx} alert={alert} />
      ))}
    </div>
  );
};

export default AlertList;
