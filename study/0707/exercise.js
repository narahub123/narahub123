const arr = [1, 2, 2, 3, 4, 5, 5];

// 중복 제거
const set = new Set(arr);

let total = 0;

for (const item of set) {
  console.log(item + 5);
  total += item;
}

const map = new Map();

map.set("total", total);

console.log(map.get("total"));

// 짝수 만 골라서 제곱 한 후 그 합계
const numbers = [3, 4, 7, 8, 10, 13];

const evens = numbers.filter((n) => n % 2 === 0).map((n) => Math.pow(n, 2));

const sum = evens.reduce((acc, cur) => acc + cur, 0);

console.log(sum);

// 3 비동기 함수
// 2초 후 데이터 준비 완료를 출력하는 비동기 함수를 만드세요

function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("데이터 준비 완료");
    }, 2000);
  });
}

async function callFunc() {
  await fetchData();
}

callFunc();
