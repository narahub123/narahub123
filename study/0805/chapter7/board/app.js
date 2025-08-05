const express = require("express");
const handlebars = require("express-handlebars");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;

const mongodbConnection = require("./configs/mongodb-connection");

const postService = require("./services/post-service");
const { ObjectId } = require("mongodb");

// handlebars 설정
app.engine(
  "handlebars",
  handlebars.create({
    // 핸들바 생성 및 엔진 반환
    helpers: require("./configs/handlebars-helpers"),
  }).engine
);
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

// CRUD
// 리스트 페이지
app.get("/", async (req, res) => {
  // 페이지
  const page = parseInt(req.query.page) || 1;

  // 검색어
  const search = req.query.search || "";

  try {
    const [posts, paginator] = await postService.list(collection, page, search);

    res.render("home", { title: "테스트 게시판", search, paginator, posts });
  } catch (error) {
    console.error(error);
    res.render("home", { title: "테스트 게시판" });
  }
});

// 글쓰기 페이지로 이동
app.get("/write", (req, res) => {
  res.render("write", { title: "테스트 게시판", mode: "create" });
});

// 글쓰기
app.post("/write", async (req, res) => {
  const post = req.body;

  console.log(post);
  
  const result = await postService.writePost(collection, post);

  res.redirect(`/detail/${result.insertedId}`);
});

// 수정 페이지 이동 
app.get("/modify/:id", async(req, res) => {
  const post = await postService.getPostById(collection, req.params.id);

  console.log(post);

  res.render("write", {title: "테스트 게시판", mode: "modify", post})
  
})

// 게시글 수정 
app.post("/modify", async(req,res)=>{
  const {id, title, writer, password, content} = req.body;

  const post = {
    title,
    writer, 
    password, 
    content,
    createdDt: new Date().toISOString(),
  };

  const result = postService.updatePost(collection, id, post);

  res.redirect(`/detail/${id}`);
})


app.get("/detail/:id", async (req, res) => {
  const result = await postService.getDetailPost(collection, req.params.id);

  res.render("detail", { title: "테스트 게시판", post: result });
});

// 비밀번호 확인
app.post('/check-password', async(req, res)=> {
  const {id, password} = req.body;

  const post = await postService.getPostByIdAndPassword(collection, {id, password});

  if(!post){
    return res.status(404).json({isExist: false});
  } else {
    return res.json({isExist: true});    
  }
})

app.delete('/delete', async(req, res)=>{
  const {id, password} = req.body;

  try {
    const result = await collection.deleteOne({_id: new ObjectId(id), password}); 

    if(result.deletedCount !== 1){
      console.log("삭제 실패");
      return res.json({isSuccess: false});
    }

    return res.json({isSuccess: true});
  } catch (error) {
    console.error(error);
    return res.json({isSuccess: false});
  }
})

app.post("/write-comment", async(req, res)=>{
  const {id, name, password, comment} = req.body;

  const post = await postService.getPostById(collection, id);

  if(post.comments){
    post.comments.push({
      idx: post.comments.length + 1,
      name,
      password,
      comment, 
      createdDt: new Date().toISOString(),
    })
  } else {
    post.comments=[
      {
        idx: 1,
        name,
        password,
        comment,
        createdDt: new Date().toISOString()
      }
    ]
  }

  postService.updatePost(collection, id, post);

  return res.redirect(`/detail/${id}`);
})

app.delete("/delete-comment", async(req, res) => {
  const {id, idx, password} = req.body;

  const post = await collection.findOne({
      _id: new ObjectId(id),
      comments: {
        $elemMatch: {
          idx: parseInt(idx),
          password
        }
      }
    },
    postService.projectionOption,
  );

  if(!post){
    return res.json({isSuccess: false});
  }

  post.comments = post.comments.filter((comment) => comment.idx != idx);
  postService.updatePost(collection, id, post);

  return res.json({isSuccess: true});
})

let collection;

app.listen(port, async () => {
  console.log(`Server started at ${port}`);

  // mongodb와 연결
  const mongoClient = await mongodbConnection();

  // POST 컬렉션 할당
  collection = mongoClient.db().collection("post");

  console.log("MongoDB connected");
});
