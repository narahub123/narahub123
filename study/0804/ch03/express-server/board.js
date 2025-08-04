const express = require("express");
const { getPosts, createPost, deletePost } = require("./board-controller");
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extends: true }));

app.get("/", getPosts);

app.post("/posts", createPost);

app.delete("/posts/:id", deletePost);

app.listen(3000, () => {
  console.log("Welcome posts START!");
});
