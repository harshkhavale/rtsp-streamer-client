import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { togglePlayPause, removeStream } from "../../redux/slices/streamSlice";
import StreamControls from "./StreamControls";
import { connectToStream } from "../utils";
import Loader from "./Loader";

const PerformanceStats = ({ stats }) => {
  if (!stats) return null;
  
  return (
    <div className="absolute top-0 right-0 bg-black/70 text-white p-2 text-xs font-mono">
      <div>FPS: {stats.current_fps}</div>
      <div>Processing: {stats.avg_processing_time}ms</div>
      <div>Detection: {stats.avg_detection_time}ms</div>
      <div>Frames: {stats.total_frames}</div>
      <div>Detections: {stats.total_detections}</div>
      <div>Uptime: {stats.uptime}s</div>
    </div>
  );
};

const StreamCard = ({ stream, isPlaying }) => {
  const { ws_url } = stream;

  const imgRef = useRef(null);
  const containerRef = useRef(null);
  const wsRef = useRef(null);
  const prevUrlRef = useRef(null);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [performanceStats, setPerformanceStats] = useState(null);

  // Auto-hide controls after inactivity
  useEffect(() => {
    let timeout;
    const hideControls = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowControls(false), 2000);
    };

    const onMouseMove = () => {
      setShowControls(true);
      hideControls();
    };

    const node = containerRef.current;
    if (node) {
      node.addEventListener("mousemove", onMouseMove);
    }

    return () => {
      clearTimeout(timeout);
      if (node) node.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  // Handle WebSocket connection and image stream
  useEffect(() => {
    if (!isPlaying) {
      if (wsRef.current) wsRef.current.close();
      return;
    }
  
    setLoading(true);
  
    const showFaceAlertNotification = (alert) => {
      if (!("Notification" in window)) return;
    
      const title = "🚨 Face Alert Detected!";
      const body = `Confidence: ${(alert.confidence * 100).toFixed(2)}%\nTimestamp: ${alert.timestamp}`;
      const icon = `${import.meta.env.VITE_API_URL}${alert.snapshot}`;
      const alertId = alert.timestamp;
    
      const clickUrl = `${window.location.origin}/alerts/${alertId}`;
    
      if (Notification.permission === "granted") {
        const notification = new Notification(title, { body, icon });
    
        notification.onclick = () => {
          window.focus();
          window.location.href = clickUrl;
        };
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            showFaceAlertNotification(alert);
          }
        });
      }
    };
    
    const onError = () => setLoading(false);
  
    const onOpen = (ws) => {
      ws.send(JSON.stringify({ command: "start", ws_url }));
    };
  
    const onClose = () => setLoading(false);
  
    const setupStream = async () => {
      try {
        const ws = await connectToStream(stream.id, ws_url, (message) => {
          if (message.type === "face_alert") {
            console.log("Face Alert Received:", message);
            showFaceAlertNotification(message);
          } else if (message.type === "performance_stats") {
            setPerformanceStats(message.stats);
          }
        }, onError, onOpen, onClose);
        wsRef.current = ws;
      } catch (err) {
        console.error("Failed to connect:", err);
      }
    };
  
    setupStream();
  
    return () => {
      if (wsRef.current) wsRef.current.close();
      if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current);
    };
  }, [ws_url, isPlaying]);

  // Handle play/pause via WebSocket when isPlaying changes
  useEffect(() => {
    if (!wsRef.current) return;

    try {
      if (isPlaying) {
        wsRef.current.send(JSON.stringify({ command: "resume" }));
      } else {
        wsRef.current.send(JSON.stringify({ command: "pause" }));
      }
    } catch (err) {
      // WebSocket might be closed; ignore
    }
  }, [isPlaying]);

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
      className={`relative bg-black border border-zinc-800 overflow-hidden ${
        isFullscreen ? "h-screen w-screen z-50 fixed inset-0" : ""
      }`}
    >
      <p className="bg-slate-900 text-green-500 p-2 text-xs">{ws_url}</p>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 z-10">
          <Loader />
        </div>
      )}

      <img
        ref={imgRef}
        alt="Live Stream"
        className={`w-full object-contain ${
          isFullscreen ? "h-screen" : "h-64 sm:h-80 md:h-96"
        } transition-all duration-300`}
        style={{ maxHeight: "100vh" }}
      />

      <PerformanceStats stats={performanceStats} />

      <StreamControls
        isPlaying={isPlaying}
        isFullscreen={isFullscreen}
        onTogglePlay={() => dispatch(togglePlayPause(ws_url))}
        onToggleFullscreen={toggleFullscreen}
        onRemove={() => dispatch(removeStream(ws_url))}
        show={showControls}
      />
    </div>
  );
};

export default StreamCard;
