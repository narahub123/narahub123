import { createServer } from "http";
import { createExpressApp } from "./express";
import { makeDir } from "./utils";
import { getPublicDirPath } from "./config";
import type { MongoDB } from "./mongodb";
import { connectAndUseDB } from "./mongodb";
import dotenv from "dotenv";
dotenv.config();

// 'public'이라는 디렉토리를 추가하는 코드 함수
makeDir(getPublicDirPath());

const connectCallback = (db: MongoDB) => {
  const hostname = process.env.REACT_APP_BASE_URL || "";

  console.log(process.env.REACT_APP_PORT);

  const PORT = Number(process.env.REACT_APP_PORT) || 3000;

  // mongodb 연결하기
  createServer(createExpressApp(db)).listen(PORT, () => {
    console.log(`connect http://${hostname}:${PORT}`);
  });
};

connectAndUseDB(connectCallback, "test");
