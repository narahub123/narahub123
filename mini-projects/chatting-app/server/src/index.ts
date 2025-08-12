import express from "express";
import morgan from "morgan";
import cors from "cors";
import { startServer } from "./app";
import routes from "./routes";
import { errorHandler } from "./middlewares";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// cors
app.use(
  cors({
    origin: process.env.CLIENT_URL, // 허용할 클라이언트 도메인
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // 허용할 HTTP 메서드
    allowedHeaders: ["Authorization", "Content-Type", "x-session-id"],
    credentials: true, // 쿠키 및 인증 정보를 포함한 요청 허용
  })
);

// 쿠키
app.use(cookieParser());

// json 변환?
app.use(express.json());

// formdata 변환
app.use(express.urlencoded({ extended: true }));

// 모간 설치: log
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// 라우터 : 미들웨어 이후에 붙이는 게 좋다고 함 by gpt
app.use("/", routes());

startServer(app);

app.use(errorHandler);
