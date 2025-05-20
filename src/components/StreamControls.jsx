import React from "react";
import { Pause, Play, Maximize, Minimize, Trash2 } from "lucide-react";

const StreamControls = ({
  isPlaying,
  isFullscreen,
  onTogglePlay,
  onToggleFullscreen,
  onRemove,
}) => {
  return (
    <div className="flex justify-between items-center px-4 py-3 bg-zinc-800">
      <button
        onClick={onTogglePlay}
        className="flex items-center gap-2 bg-yellow-400 text-black px-4 py-1.5 rounded hover:bg-yellow-300 transition"
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        {isPlaying ? "Pause" : "Play"}
      </button>
      <div className="flex gap-2">
        <button
          onClick={onToggleFullscreen}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-500 transition"
        >
          {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        </button>
        <button
          onClick={onRemove}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-1.5 rounded hover:bg-red-500 transition"
        >
          <Trash2 size={18} />
          Remove
        </button>
      </div>
    </div>
  );
};

export default StreamControls; 