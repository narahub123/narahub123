const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 3000 });

server.on("connection", (ws) => {
  ws.send("connected");

  ws.on("message", (message) => {
    ws.send(`${message}`);
  });

  ws.on("close", () => {
    console.log(" 클라이언트 접속 해젠");
  });
});
