import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStream } from "../../redux/slices/streamSlice";

const StreamInput = () => {
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    dispatch(addStream(url));
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
