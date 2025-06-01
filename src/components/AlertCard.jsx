import React from 'react';

const AlertCard = ({ alert }) => {
  const { timestamp, confidence, snapshot } = alert;

  return (
    <div className="rounded-xl shadow-md border p-4 bg-white hover:shadow-lg transition">
      <img
        src={snapshot}
        alt="Detected Face"
        className="w-full h-48 object-cover rounded-md mb-3"
      />
      <p className="text-sm text-gray-600">🕒 {new Date(timestamp).toLocaleString()}</p>
      <p className="font-semibold text-green-600">Confidence: {Math.round(confidence * 100)}%</p>
    </div>
  );
};

export default AlertCard;
