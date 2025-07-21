export function slowFunction(num: number) {
  console.log("무거운 계산 실행중..");
  let result = 0;
  for (let i = 0; i < 1e8; i++) {
    result += num * Math.random();
  }

  return result;
}
