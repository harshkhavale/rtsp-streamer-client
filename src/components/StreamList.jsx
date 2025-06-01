import React from "react";

const StreamList = ({ streams, onSelectStream, selectedStream }) => {
  return (
    <div className={`p-4 h-full ${streams.length > 0 ? 'bg-gray-900':''} text-white w-full`}>
      {streams.length > 0 && <h2 className="text-xl mb-4">Available Streams</h2>}

      <ul className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
        {streams?.map((stream) => (
          <li
            key={stream.id}
            onClick={() => onSelectStream(stream)}
            className={`relative cursor-pointer p-4 min-w-[250px] rounded shadow-md transition ${
              selectedStream?.id === stream.id
                ? "border border-blue-600 bg-gray-800"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            <div className="font-semibold">{stream.name}</div>
            <p className="text-xs">{stream.description}</p>
            <p className="text-xs text-blue-400 break-words">{stream.rtsp_url}</p>
            <span className="text-xs absolute top-2 right-2 rounded-full bg-red-500 px-2 py-0.5 font-bold">
              {stream.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StreamList;
