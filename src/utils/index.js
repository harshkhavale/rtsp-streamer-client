export const apiUrl = import.meta.env.VITE_API_URL;

export const connectToStream = (stream_id,url, onMessage, onError, onOpen, onClose) => {
  return new Promise((resolve, reject) => {
    try {
      const queryURL = url + `&stream_id=${stream_id}`
      const ws = new WebSocket(queryURL); // <-- your WebSocket server
      console.log(queryURL);

      ws.binaryType = "blob";

      ws.onopen = () => {
        onOpen(ws);
        resolve(ws); // <-- make sure this is here
      };

      ws.onmessage = (event) => {
        if (event.data instanceof Blob) {
          onMessage?.(event.data);
        } else {
          const raw = event.data;
          let parsed;
          try {
            parsed = JSON.parse(raw);
            // Sometimes the parsed result is a stringified JSON again
            if (typeof parsed === "string") {
              parsed = JSON.parse(parsed);
            }
            console.log("WS JSON Received:", parsed);
          } catch (e) {
            console.warn("Non-JSON message received", raw);
            return;
          }
          if (parsed.type === 'face_alert') {
            onMessage?.(parsed);
          }
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
export const createStream = async (streamData) => {
  try {
    const response = await fetch(`${apiUrl}/api/streams/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(streamData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create stream");
    }

    const data = await response.json();
    return data; // contains id, ws_url, message, etc.
  } catch (err) {
    console.error("Error creating stream:", err);
    throw err;
  }
};

export const fetchStreams = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/streams`);
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
export const fetchAlerts = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/alerts`);
    console.log(response);
    if (!response.ok) {
      throw new Error(`Failed to fetch alerts: ${response.statusText}`);
    }
    const alerts = await response.json();
    console.log(alerts.alerts);
    return alerts.alerts; // assuming this is an array of stream URLs or objects

  } catch (err) {
    console.error("Error fetching alerts:", err);
    return [];
  }
};
export const loginUser = () => {};
export const logoutUser = () => {};
