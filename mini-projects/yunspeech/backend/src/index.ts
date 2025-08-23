import express from "express";
import cors from "cors";
import routes from "./routes";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3302;

const app = express();

app.use("/", routes());

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => console.log("서버가 3302에 연결됨"));
