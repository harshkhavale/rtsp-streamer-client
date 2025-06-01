// StreamsView.jsx
import StreamInput from "../components/StreamInput";
import StreamList from "../components/StreamList";
import StreamCard from "../components/StreamCard";
import { Video } from "lucide-react";

const StreamsView = ({
  streams,
  selectedStream,
  onSelectStream,
  addStream,
  loadingStreams,
  error,
}) => (
  <div className="flex flex-col h-full">
    <div className=" border-r border-gray-700 p-4 bg-gray-900">
      <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
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
      ) : (
        <p className="text-center mt-20">Select a stream to start viewing</p>
      )}
    </section>
  </div>
);

export default StreamsView;
