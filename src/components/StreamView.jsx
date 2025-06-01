// StreamsView.jsx
import StreamInput from "../components/StreamInput";
import StreamList from "../components/StreamList";
import StreamCard from "../components/StreamCard";
import { Podcast, Video } from "lucide-react";

const StreamsView = ({
  streams,
  selectedStream,
  onSelectStream,
  addStream,
  loadingStreams,
  error,
}) => (
  <div className="flex flex-col h-full">
    <div className=" border-r border-gray-700 bg-gray-900">
      <h2 className="text-xl font-semibold flex p-4 items-center gap-2 mb-4">
        <Video size={24} />
        Streams
      </h2>
      <StreamInput onAddStream={addStream} />
      {loadingStreams ? (
        <p>Loading streams...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <StreamList
          streams={streams}
          selectedStream={selectedStream}
          onSelectStream={onSelectStream}
        />
      )}
    </div>

    <section className="flex-1 p-4 overflow-auto">
      {selectedStream ? (
        <StreamCard
          isPlaying={true}
          stream={selectedStream}
        />
      ) : (<div className="text-gray-500 h-96 pt-32 flex justify-center items-center gap-4 flex-col">
        <p className="text-center mt-20">Select/Create a stream to start viewing</p><Podcast className="   size-[10rem]"/></div>
      )}
    </section>
  </div>
);

export default StreamsView;
