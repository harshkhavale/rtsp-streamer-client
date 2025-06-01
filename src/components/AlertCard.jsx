import React from 'react';
import { apiUrl } from '../utils';

const AlertCard = ({ alert }) => {
  const { timestamp, confidence_score, image_url } = alert;

  return (
    <div className="rounded-xl shadow-md border p-4 bg-white hover:shadow-lg transition">
      <img
        src={`${apiUrl}/${image_url}`}
        alt="Detected Face"
        className="w-full h-48 object-cover rounded-md mb-3"
      />
      <p className="text-sm text-gray-600">🕒 {new Date(timestamp).toLocaleString()}</p>
      <p className="font-semibold text-green-600">
  Confidence: {Math.round(parseFloat(confidence_score) * 100)}%
</p>
    </div>
  );
};

export default AlertCard;
