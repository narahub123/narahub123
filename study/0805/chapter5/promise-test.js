const DB = [];

function saveDB(user) {
  const oldDBsize = DB.length + 1;

  DB.push(user);
  console.log(`save ${user.name} to DB`);

  return new Promise((resolve, reject) => {
    // Promise 사용
    if (DB.length > oldDBsize) {
      resolve(user); // 성공 시 유저 정보 반환
    } else {
      reject(new Error("Save DB Error!")); // 실패 시 에러 발생
    }
  });
}

function sendEmail(user) {
  console.log(`email to ${user.email}`);

  return new Promise((resolve) => {
    resolve(user);
  });
}

function getResult(user) {
  return new Promise((resolve, reject) => {
    resolve(`success register ${user.name}`);
  });
}

function registerByPromise(user) {
  // 비동기 호출이지만, 순서를 지켜서 실행
  const result = saveDB(user)
    .then(sendEmail)
    .then(getResult)
    .catch((error) => new Error(error))
    .finally(() => console.log("완료"));

  // 아직 완료되지 않았으므로 지연 상태
  console.log(result);

  return result;
}

const myUser = { email: "andy@test.com", password: "1234", name: "Andy" };

// promise 실습 1
const result = registerByPromise(myUser);

result.then(console.log);

// 여러 객체 동시에 호출하기
// const allResult = Promise.all([
//   saveDB(myUser),
//   sendEmail(myUser),
//   getResult(myUser),
// ]);

// allResult.then(console.log);
