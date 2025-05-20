import { useState } from "react";
import StreamInput from "../components/StreamInput";
import StreamGrid from "../components/StreamGrid";


const Home = () => {
  const [streams, setStreams] = useState([]);

  const addStream = (url) => {
    setStreams((prev) => [...prev, url]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl text-center py-6 font-bold">RTSP Stream Viewer</h1>
      <StreamInput onAddStream={addStream} />
      <StreamGrid streams={streams} />
    </div>
  );
};

export default Home;
