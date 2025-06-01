import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStream } from "../../redux/slices/streamSlice";
import { Plus, Podcast } from "lucide-react";

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <input
        type="text"
        className="w-full p-2 border rounded"
        placeholder="Enter RTSP URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button type="submit" className="px-4 py-2 text-nowrap flex text-center justify-center items-center gap-1 bg-blue-600 cursor-pointer text-white rounded">
        Add Stream <Plus/>
      </button>
    </form>
  );
};

export default StreamInput;
