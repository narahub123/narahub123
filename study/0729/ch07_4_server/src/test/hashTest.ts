import * as U from "../utils";

const hashTest = async () => {
  const password = "1234";

  try {
    // 패스워드 해싱하기
    const hashed = await U.hashPasswordP(password);

    console.log("hashed", hashed);

    // 해싱 패스워드와의 비교
    const same = await U.comparePasswordP(password, hashed);

    console.log("same", same);

    const same2 = await U.comparePasswordP("abcd", hashed);

    console.log("same2", same2);
  } catch (e) {
    if (e instanceof Error) console.error("error", e.message);
  }
};

hashTest();
