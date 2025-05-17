import { useRef, useEffect, useState } from "react";

const StreamCard = ({ streamUrl }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.src = `ws://localhost:8000/ws/stream/?url=${encodeURIComponent(streamUrl)}`;
      video.play();
    }
  }, [streamUrl]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (playing) {
      video.pause();
    } else {
      video.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="border rounded p-2 bg-black">
      <video
        ref={videoRef}
        controls
        autoPlay
        muted
        className="w-full h-auto rounded"
      />
      <div className="text-sm mt-2 flex justify-between items-center">
        <span className="truncate max-w-xs text-white">{streamUrl}</span>
        <button onClick={togglePlay} className="text-xs px-2 py-1 bg-gray-700 text-white rounded">
          {playing ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
};

export default StreamCard;
