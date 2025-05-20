import React from "react";
import { Pause, Play, Maximize, Minimize, Trash2 } from "lucide-react";

const StreamControls = ({
  isPlaying,
  isFullscreen,
  onTogglePlay,
  onToggleFullscreen,
  onRemove,
  show,
}) => {
  return (
    <div
      className={`absolute bottom-0 left-0 w-full flex justify-between items-center px-4 py-2 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-4">
        <button onClick={onTogglePlay} className="text-white cursor-pointer hover:scale-105 transition">
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button onClick={onToggleFullscreen} className="text-white cursor-pointer hover:scale-105 transition">
          {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
        </button>
      </div>
      <button onClick={onRemove} className="text-white cursor-pointer hover:text-red-500 transition">
        <Trash2 size={20} />
      </button>
    </div>
  );
};

export default StreamControls;
