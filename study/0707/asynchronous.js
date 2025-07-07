// promise
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("data received");
    }, 3000);
  });
}

// fetchData().then((data) => console.log(data));

// console.log(fetchData()); // Promise { <pending> }

// async - await
// function loadData() {
//   const result = fetchData();

//   console.log(result);
// }

// async function loadData() {
//   const result = await fetchData();

//   console.log(result);
// }

// loadData();

// 실전 예제 : 유저 정보 가져오기
// api
function getUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: "Lee", age: 25 });
    }, 1000);
  });
}

// getUser().then((data) => console.log(data));

// usecase
async function showUser() {
  console.log("유저 정보 로딩중...");

  const user = await getUser();

  console.log(`이름 : ${user.name}, 나이 : ${user.age}`);
}

// showUser();

// try-catch
async function load() {
  try {
    const data = await fetch("http://example.com/data");
    const json = await data.json();

    console.log(json);
  } catch (err) {
    console.error("데이터 로딩 실패", err);

    return;
  }
}

// load();

// 비동기 병렬 처리
const p1 = fetch("http://hn.algolia.com/api/v1/items/1");
const p2 = fetch("http://hn.algolia.com/api/v1/items/2");
const p3 = fetch("https://example.com/data3");
const p4 = fetch("https://example.com/data4");
const p5 = fetch("https://example.com/data5");

async function test() {
  const [res1, res2] = await Promise.all([p1, p2, p3]);

  console.log(res1);
  console.log(res2);
  console.log(res1, res2);
}

test();

// 과제 1
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function helloAfter2s() {
  await delay(2000);

  console.log(`2초 후 Hello`);
}

helloAfter2s();
