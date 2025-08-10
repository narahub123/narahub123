import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 8080;
const BASE_URL = process.env.BASE_URL || "http://localhost";

const app = express();

// cors
app.use(cors());

// json 변환?
app.use(express.json());

// formdata 변환
app.use(express.urlencoded({ extended: true }));

// 모간 설치: log
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// 서버 실행
app.listen(PORT, () => {
  console.log(`${BASE_URL}:${PORT}에 연결됨`);
});
