function myWork(work) {
  return new Promise((resolve, reject) => {
    if (work === "done") {
      resolve("게임 가능");
    } else {
      reject("게임 불가능");
    }
  });
}

// 콜백과 비슷하게 처리
myWork("done").then(
  function (value) {
    console.log(value);
  },
  function (err) {
    console.error(err);
  }
);

// then-catch 사용
myWork("doing")
  .then(function (value) {
    console.log("value");
  })
  .catch((err) => console.error(err));
