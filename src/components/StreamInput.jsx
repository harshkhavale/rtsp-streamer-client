import { useState } from "react";

const StreamInput = ({ onAddStream }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    onAddStream(url);
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 p-4">
      <input
        type="text"
        className="w-full p-2 border rounded"
        placeholder="Enter RTSP URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        Add Stream
      </button>
    </form>
  );
};

export default StreamInput;
