import WebSocket from "ws";
import http from "http";

export default (
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
) => {
  const webSocket = new WebSocket.Server({ server });

  webSocket.on("connection", (ws) => {
    ws.send("connected");

    ws.on("message", (msg) => {
      const [user, message] = msg.toString().split("-");

      ws.send(`${user}-${message}`);
    });

    ws.on("close", () => {
      console.log("클라언트와 접속 해제");
    });
  });
};
