import { db } from "../config";

// 연결 확인용 함수
export async function dbConnectionCheck() {
  try {
    // 1. test 컬렉션에 문서 작성
    const testDocRef = db.collection("test").doc("connection-check");

    // 2. 방금 작성한 문서 읽기
    const snapshot = await testDocRef.get();
    if (snapshot.exists) {
      console.log("📄 읽은 데이터:", snapshot.data());
    } else {
      console.log("❌ 문서를 찾을 수 없습니다");
    }
  } catch (error) {
    console.error("🚨 Firestore 연결 실패:", error);
  }
}
