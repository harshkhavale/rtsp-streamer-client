export const connectToStream = async (streamUrl, onMessage, onError, onOpen, onClose) => {
    try {
      const response = await fetch("https://rtsp-streamer-server.onrender.com/api/start/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rtsp_url: streamUrl }),
      });
  
      const data = await response.json();
      if (!data.ws_url) {
        throw new Error("No WebSocket URL received");
      }
  
      const ws = new WebSocket(data.ws_url);
      ws.binaryType = "blob";
  
      ws.onopen = () => {
        if (onOpen) onOpen(ws);
      };
      ws.onmessage = (event) => {
        if (onMessage) onMessage(event.data);
      };
      ws.onerror = (err) => {
        if (onError) onError(err);
      };
      ws.onclose = () => {
        if (onClose) onClose();
      };
  
      return ws;
    } catch (err) {
      if (onError) onError(err);
      return null;
    }
  };
  