import WebSocket, { WebSocketServer } from "ws";
import http from "http";
import { ChatRequestDto } from "../types";
import { chatroomService } from "../services";

export default (
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
) => {
  const rooms: Record<
    string,
    WebSocket.Server<typeof WebSocket, typeof http.IncomingMessage>
  > = {};

  server.on("upgrade", (req, socket, head) => {
    const { pathname, searchParams } = new URL(req.url!, "ws://localhost:3301");

    const roomId = searchParams.get("roomId");

    if (!roomId) return;
    console.log(pathname, roomId);

    if (rooms[roomId]) {
      rooms[roomId].handleUpgrade(req, socket, head, (ws) => {
        rooms[roomId].emit("connection", ws, req);
      });
    } else {
      const newRoom = new WebSocketServer({ noServer: true });

      newRoom.on("connection", (ws) => {
        ws.on("error", console.error);

        console.log(`${roomId}방에 연결됨`);
        ws.send("connected");

        ws.on("message", async (msg) => {
          const msgInfo: ChatRequestDto = JSON.parse(msg.toString());

          const chatData = await chatroomService.saveChat(msgInfo);

          newRoom.clients.forEach((client) => {
            client.send(JSON.stringify(chatData));
          });

          console.log("메시지 전송");
        });

        ws.on("close", () => {
          console.log("클라언트와 접속 해제");
        });
      });

      rooms[roomId] = newRoom;

      newRoom.handleUpgrade(req, socket, head, (ws) => {
        rooms[roomId].emit("connection", ws, req);
      });
    }
  });
};
