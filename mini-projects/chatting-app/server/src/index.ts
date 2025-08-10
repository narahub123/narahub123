import express from "express";
import morgan from "morgan";
import cors from "cors";
import { startServer } from "./app";

const app = express();

// cors
app.use(cors());

// json 변환?
app.use(express.json());

// formdata 변환
app.use(express.urlencoded({ extended: true }));

// 모간 설치: log
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

startServer(app);
