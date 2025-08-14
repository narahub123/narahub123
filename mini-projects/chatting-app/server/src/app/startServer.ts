import { dbConnectionCheck } from "../utils";
import { Express } from "express";
import http from "http";
import dotenv from "dotenv";
import websocket from "../websocket";

dotenv.config();

// 서버 시작 함수
export const startServer = async (app: Express) => {
  const PORT = process.env.PORT || 8080;
  const BASE_URL = process.env.BASE_URL || "http://localhost";

  try {
    // Firestore 연결 테스트
    await dbConnectionCheck();
    console.log("✅ Firestore 연결 성공");

    // HTTP 서버 생성
    const server = http.createServer(app);

    // 서버 실행
    server.listen(PORT, () => {
      console.log(`${BASE_URL}:${PORT}에 연결됨`);
    });

    websocket(server);
  } catch (error) {
    console.error("❌ Firestore 연결 실패, 서버 시작 중단", error);
    process.exit(1); // 연결 실패 시 프로세스 종료
  }
};
