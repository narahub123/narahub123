import dotenv from "dotenv";
import { createServer } from "http";
import { createExpressApp } from "./express";
import { makeDir } from "./utils";
import { getPublicDirPath } from "./config";
dotenv.config();

// 'public'이라는 디렉토리를 추가하는 코드 함수 
makeDir(getPublicDirPath());

const hostname = process.env.REACT_APP_BASE_URL || "";

const PORT = Number(process.env.REACT_APP_PORT) || 3000;

createServer(createExpressApp()).listen(PORT, () => {
  console.log(`connect http://${hostname}:${PORT}`);
});
