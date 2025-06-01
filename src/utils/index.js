const apiUrl = import.meta.env.VITE_API_URL;

export const connectToStream = (url, onMessage, onError, onOpen, onClose) => {
  return new Promise((resolve, reject) => {
    try {
      const ws = new WebSocket(url); // <-- your WebSocket server

      ws.binaryType = "blob";

      ws.onopen = () => {
        onOpen(ws);
        resolve(ws); // <-- make sure this is here
      };

      ws.onmessage = (event) => {
        const data = event.data;
        if (data instanceof Blob) {
          onMessage(data);
        }
      };

      ws.onerror = (err) => {
        onError(err);
        reject(err); // <-- also reject on error
      };

      ws.onclose = () => {
        onClose();
      };
    } catch (err) {
      reject(err);
    }
  });
};


export const fetchStreams = async () => {
  try {
    const response = await fetch(`${apiUrl}/streams`);
    console.log(response);
    if (!response.ok) {
      throw new Error(`Failed to fetch streams: ${response.statusText}`);
    }
    const streams = await response.json();
    console.log(streams.streams);
    return streams.streams; // assuming this is an array of stream URLs or objects
  } catch (err) {
    console.error("Error fetching streams:", err);
    return [];
  }
};
export const fetchAlerts = async () => {};

export const loginUser = () => {};
export const logoutUser = () => {};
