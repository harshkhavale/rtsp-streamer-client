import { useState } from "react";
import StreamInput from "../components/StreamInput";
import StreamGrid from "../components/StreamGrid";
import { Podcast } from "lucide-react";

const Home = () => {
  const [streams, setStreams] = useState([]);

  const addStream = (url) => {
    setStreams((prev) => [...prev, url]);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-6 text-center flex justify-center items-center flex-col">
        <h1 className="md:text-4xl text-2xl flex items-center text-center gap-2 font-bold tracking-tight sm:text-5xl">
          RTSP Stream Viewer <Podcast size={42}/>
        </h1>
        <p className="mt-4 bg-slate-900 p-4 text-blue-600 text-xs max-w-2xl mx-auto">
        Please note: Streaming may take a few moments to load as the backend is running on a free-tier server {"(Render)"}.
        </p>
      </header>

      <section className="max-w-3xl mx-auto w-full mb-8">
        <StreamInput onAddStream={addStream} />
      </section>

      <section className="max-w-7xl mx-auto">
        <StreamGrid streams={streams} />
      </section>
    </main>
  );
};

export default Home;
