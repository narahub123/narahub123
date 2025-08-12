import { dbConnectionCheck } from "../utils";
import { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8080;
const BASE_URL = process.env.BASE_URL || "http://localhost";

// 서버 시작 함수
export const startServer = async (app: Express) => {
  try {
    // Firestore 연결 테스트
    await dbConnectionCheck();
    console.log("✅ Firestore 연결 성공");

    // 서버 실행
    app.listen(PORT, () => {
      console.log(`${BASE_URL}:${PORT}에 연결됨`);
    });
  } catch (error) {
    console.error("❌ Firestore 연결 실패, 서버 시작 중단", error);
    process.exit(1); // 연결 실패 시 프로세스 종료
  }
};
