import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { togglePlayPause, removeStream } from "../../redux/slices/streamSlice";
import StreamControls from "./StreamControls";
import { connectToStream } from "../utils";
import Loader from "./Loader";

const StreamCard = ({ streamUrl, isPlaying }) => {
  const imgRef = useRef(null);
  const containerRef = useRef(null);
  const wsRef = useRef(null);
  const prevUrlRef = useRef(null);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

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

    const onError = () => setLoading(false);
    const onOpen = (ws) => ws.send(streamUrl);
    const onClose = () => {};

    connectToStream(streamUrl, onMessage, onError, onOpen, onClose).then(
      (ws) => {
        wsRef.current = ws;
      }
    );

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
      className={`relative bg-black border border-zinc-800 overflow-hidden ${
        isFullscreen ? "h-screen w-screen z-50 fixed inset-0" : ""
      }`}
    >
      {" "}
      <p className=" bg-slate-900 text-blue-600 p-2 text-xs">{streamUrl}</p>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 z-10">
          <Loader />
        </div>
      )}
      <img
        ref={imgRef}
        alt="Live Stream"
        className={`w-full object-contain ${
          isFullscreen
            ? "h-screen "
            : "h-64 sm:h-80 md:h-96"
        } transition-all duration-300`}
        style={{ maxHeight: "100vh" }}
      />
      <StreamControls
        isPlaying={isPlaying}
        isFullscreen={isFullscreen}
        onTogglePlay={() => dispatch(togglePlayPause(streamUrl))}
        onToggleFullscreen={toggleFullscreen}
        onRemove={() => dispatch(removeStream(streamUrl))}
        show={showControls}
      />
    </div>
  );
};

export default StreamCard;
