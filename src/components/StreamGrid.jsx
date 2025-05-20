import { useSelector } from "react-redux";
import StreamCard from "./StreamCard";

const StreamGrid = () => {
  const streams = useSelector(state => state.stream.streams);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {streams.map(({ url, isPlaying }) => (
        <StreamCard key={url} streamUrl={url} isPlaying={isPlaying} />
      ))}
    </div>
  );
};

export default StreamGrid;
