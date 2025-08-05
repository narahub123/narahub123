async function myName() {
  return "Andy";
}

async function showName() {
  const name = await myName();
  console.log(name);
}

// console.log(myName());
console.log(showName());

// 1~10까지 세기
// 1초 대기하고 메시지 출력
function waitOneSecond(msg) {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      return resolve(`${msg}`);
    }, 1000);
  });
}

async function countOneToTen() {
  for (let x of [...Array(10).keys()]) {
    let result = await waitOneSecond(`${x + 1}초 대기 중...`);

    console.log(result);
  }

  console.log("완료");
}

countOneToTen();
