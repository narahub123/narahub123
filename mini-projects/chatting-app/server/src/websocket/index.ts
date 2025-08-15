import WebSocket from "ws";
import http from "http";

export default (
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
) => {
  const webSocket = new WebSocket.Server({ server });

  webSocket.on("connection", (ws) => {
    ws.send("connected");

    ws.on("message", (msg) => {
      const message = JSON.parse(msg.toString());

      webSocket.clients.forEach((client) => {
        client.send(JSON.stringify(message));
      });

      console.log("메시지 전송");
    });

    ws.on("close", () => {
      console.log("클라언트와 접속 해제");
    });
  });
};
