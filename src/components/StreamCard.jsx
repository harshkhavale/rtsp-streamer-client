import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { togglePlayPause, removeStream } from "../../redux/slices/streamSlice";
import StreamControls from "./StreamControls";
import { connectToStream } from "../utils";

const StreamCard = ({ streamUrl, isPlaying, streamId }) => {
  const imgRef = useRef(null);
  const containerRef = useRef(null);
  const wsRef = useRef(null);
  const prevUrlRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isPlaying) {
      if (wsRef.current) wsRef.current.close();
      return;
    }

    setLoading(true);

    const onMessage = (data) => {
      if (imgRef.current) {
        if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current);
        const objectUrl = URL.createObjectURL(data);
        imgRef.current.src = objectUrl;
        prevUrlRef.current = objectUrl;
        setLoading(false);
      }
    };

    const onError = (err) => {
      console.error("WebSocket error:", err);
      setLoading(false);
    };

    const onOpen = (ws) => ws.send(streamUrl);
    const onClose = () => console.log("WebSocket closed");

    connectToStream(streamUrl, onMessage, onError, onOpen, onClose).then((ws) => {
      wsRef.current = ws;
    });

    return () => {
      if (wsRef.current) wsRef.current.close();
      if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current);
    };
  }, [streamUrl, isPlaying]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl overflow-hidden ${
        isFullscreen ? "h-screen w-screen z-50 fixed inset-0" : ""
      } transition-all duration-300`}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-10">
          <span className="text-white font-semibold animate-pulse">Loading Stream...</span>
        </div>
      )}
      <img
        ref={imgRef}
        alt="Live Stream"
        className="w-full h-80 md:h-96 object-cover rounded-t-xl"
      />

      <StreamControls
        isPlaying={isPlaying}
        isFullscreen={isFullscreen}
        onTogglePlay={() => dispatch(togglePlayPause(streamId))}
        onToggleFullscreen={toggleFullscreen}
        onRemove={() => dispatch(removeStream(streamId))}
      />
    </div>
  );
};

export default StreamCard;