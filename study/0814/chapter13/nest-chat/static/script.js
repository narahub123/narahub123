const socket = io('http://localhost:3000/chat'); // 네임스페이스 추가
const roomSocket = io('http://localhost:3000/room');
const nickname = prompt('닉네임을 입력해주세요.');
let currentRoom = ''; // 채팅방 초기값

function sendMessage() {
  if (currentRoom === '') {
    alert('방을 선택해주세요.');
    return;
  }

  const message = $('#message').val();
  const data = { message, nickname, room: currentRoom };

  $('#chat').prepend(`<div>나 : ${message}</div>`);

  socket.emit('message', data); // roomgateway로 메시지 보내기
  return false;
}

socket.on('connect', () => {
  console.log('connected');
});

socket.on('message', (message) => {
  $('#chat').prepend(`<div>${message}</div>`);
});

function createRoom() {
  const room = prompt('생성할 방의 이름을 입력해주세요.');
  roomSocket.emit('createRoom', { room, nickname });
}

socket.on('notice', (data) => {
  $('#notice').append(`<div>${data.message}</div>`);
});

// 채팅방 내에서 대화를 나눌 때 사용하는 이벤트
roomSocket.on('message', (data) => {
  console.log(data);
  $('#chat').prepend(`<div>${data.message}</div>`);
});

roomSocket.on('rooms', (data) => {
  console.log(data);
  $('#rooms').empty(); // 갱신 시 리스트 비움
  data.forEach((room) => {
    $('#rooms').append(
      `<li>${room} <button onClick="joinRoom('${room}')">join</button></li>`,
    );
  });
});

// 방에 들어갈 때는 기존에 있던 방에서 나가기
function joinRoom(room) {
  roomSocket.emit('joinRoom', { room, nickname, toLeaveRoom: currentRoom });
  $('#chat').html(''); // 채팅방 이동시 기존 메시지 삭제
  currentRoom = room;
}
