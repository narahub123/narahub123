// 구조 분해, 스프레드 연산자

// spread
const user = { id: 1, name: "Kim", age: 20, address: "Seoul" };
// const updated = { ...user };

// const updated = { ...user, name: "Lee" };

const updated = { id: 2, ...user, name: "Lee", age: 21 };

console.log(updated); // { id: 1, name: 'Lee' }

const userArr = [1, 2, 3, 4, 5];

const updatedArr = [1, 2, ...userArr, 6, 7];
// [ 1, 2, 1, 2, 3, 4, 5, 6, 7 ]

console.log(updatedArr);

// destructuring : 구조 분해 할당
const userSplit = { id: 1, name: "Kim", age: 20, address: "Seoul" };

// const { id, name, age, address } = userSplit;

// console.log(id, name, age, address); // 1 Kim 20 Seoul

// spread + destructuring
const { id, name, ...rest } = userSplit;

console.log(id, name, rest); // 1 Kim { age: 20, address: 'Seoul' }

// 연습 문제
// 구조 분해 할당을 이용해서 다음 객체에서 title과 author를 추출하세요.
const book = { title: "위대한 개츠비", author: "스콧 피츠제럴드" };
const { title, author } = book;

console.log(title, author);
