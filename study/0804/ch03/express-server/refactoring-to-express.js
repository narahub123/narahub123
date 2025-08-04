const url = require("url");
const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log("익스프레스로 라우터 리팩토링하기");
});

app.get("/", (_, res) => res.end("HOME"));
app.get("/user", user);
app.get("/feed", feed);

function user(req, res) {
  // 쿼리스트링 데이터를 userInfo에 할당
  const userInfo = url.parse(req.url, true).query;

  res.json(`[user] name: ${userInfo.name}, age: ${userInfo.age}`);
}

function feed(_, res) {
  res.json(`<ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
        </ul>`);
}
