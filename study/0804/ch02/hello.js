const http = require("http");

let count = 0;

// 서버 인스턴스를 만드는 함수
const server = http.createServer((req, res) => {
  
  log(count);

  //  요청에 댛나 상태 코드 설정 
  res.statusCode = 200;
  // 요청/응답에 대한 부가 정보 설정 
  res.setHeader("Content-Type", "text/plain");
  // 응답 설정 
  res.write("hello\n");

  setTimeout(() => {
    res.end("Node.js");
  }, 2000);
});

function log(count) {
  console.log((count += 1));
}

// 
server.listen(8000, () => console.log("Hello Node.js"));
