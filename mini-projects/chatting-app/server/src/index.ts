import express from "express";
import morgan from "morgan";
import cors from "cors";
import { startServer } from "./app";
import routes from "./routes";
import { errorHandler } from "./middlewares";
import cookieParser from "cookie-parser";

const app = express();

// cors
app.use(cors());

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
