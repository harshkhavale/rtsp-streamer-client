// components/Loader.jsx
import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-40">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-zinc-700 animate-spin-slow"></div>
        <div className="absolute inset-2 rounded-full border-4 border-zinc-500 animate-spin-reverse"></div>
        <div className="absolute inset-4 rounded-full border-4 border-zinc-300 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loader;
