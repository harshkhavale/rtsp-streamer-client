import StreamCard from "./StreamCard";

const StreamGrid = ({ streams }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {streams.map((url, index) => (
        <StreamCard key={index} streamUrl={url} />
      ))}
    </div>
  );
};

export default StreamGrid;
