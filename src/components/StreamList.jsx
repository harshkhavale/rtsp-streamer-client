import React from "react";

const StreamList = ({ streams, onSelectStream, selectedStream }) => {
  return (
    <div className="p-4 h-full w-64 bg-gray-900 text-white">
      <h2 className="text-xl mb-4">Available Streams</h2>
      <ul>
        {streams?.map((stream) => (
          <li
            key={stream.id}
            onClick={() => onSelectStream(stream)}
            className={`relative cursor-pointer p-2 rounded ${
              selectedStream?.id === stream.id ? "border  px-2  hover:bg-gray-800 border-blue-600" : "hover:bg-gray-700"
            }`}
          >
            {stream.name}
            <p className=" text-xs">{stream.description}</p>
            <p className=" text-xs text-wrap text-blue-500">{stream.rtsp_url}</p>

            <p className="text-xs absolute top-2 right-2 rounded-full bg-red-500 font-bold w-min p-1">{stream.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StreamList;
