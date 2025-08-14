import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// 네임스페이스 지정하기
@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  handleMessage(socket: Socket, data: any): void {
    const { message, nickname } = data;

    socket.broadcast.emit('message', `${nickname} : ${message}`);
  }
}

@WebSocketGateway({ namespace: 'room' })
export class RoomGateway {
  constructor(private readonly chatGateway: ChatGateway) {}
  rooms: any[] = [];

  @WebSocketServer() server: Server;

  @SubscribeMessage('createRoom')
  handleMessage(@MessageBody() data) {
    const { nickname, room } = data;

    this.chatGateway.server.emit('notice', {
      message: `${nickname}님이 ${room}방을 만들었습니다.`,
    });

    this.rooms.push(room);

    this.server.emit('rooms', this.rooms);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(socket: Socket, data) {
    const { nickname, room, toLeaveRoom } = data;

    socket.leave(toLeaveRoom); // 기존 방에서 나가기

    this.chatGateway.server.emit('notice', {
      message: `${nickname}님이 ${room}방에 입장했습니다`,
    });

    socket.join(room); // 새로운 방에 입장
  }

  // RoomGateway로 메시지가 오면 처리
  @SubscribeMessage('message')
  handleMessageToRoom(socket: Socket, data) {
    const { nickname, room, message } = data;

    console.log(data);

    socket.broadcast.to(room).emit('message', {
      message: `${nickname} : ${message}`,
    });
  }
}
