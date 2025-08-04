const http = require("http");

const server = http.createServer((req, res) => {
  // 응답 헤더 값 설정
  res.writeHead(200, { "content-type": "text/plain" });

  // ok를 응답하고 종료
  res.end("OK");
});

// 서버 실행
server.listen(3000, () => {
  console.log("OK 서버 시작");
});
