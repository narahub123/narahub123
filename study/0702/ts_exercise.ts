// // 1. 타입에 맞는 값만 허용
// function printAge(age: number) {
//   if (typeof age !== "number") {
//     throw new Error("숫자만 허용됩니다.");
//   }

//   console.log(`${age}살`);
// }

// printAge(20);

// // 2. 커스텀 타입 검사 함수 만들기 (별칭 실습)
// type UserInput = string | number;

// function isString(input: UserInput): input is string {
//   return typeof input === "string";
// }

// // 3. 반환 타입 유효성 검사
// function getStatus(code: number): "success" | "error" {
//   if (code === 200) {
//     return "success";
//   }

//   return "error";
// }

// // 4. 매개변수 string 일 때만 길이 출력하는 함수
// function showLength(input: string | number) {
//   if (typeof input === "string") {
//     console.log(`길이 : ${input.length}`);
//   } else {
//     console.log("문자열이 아닙니다.");
//   }
// }

// Beginner 연습 문제

// 1. 문자열 변수 선언
let Name: string = "Alice";

// 2. 숫자와 boolean 타입
let age: number;
let isStudent: boolean;

age = 21;
isStudent = true;

// 3. 함수 매개변수와 반환 타입
function add(a: number, b: number): number {
  return a + b;
}

// 4. 배열 타입
let score: number[];

score = [80, 90, 100];

// 5. 객체 타입 정의
let person: {
  name: string;
  age: 10 | 20 | 30;
} = {
  name: "Alice",
  age: 10,
};

person.name = "Paris";
person.age = 30;

// 6. 유니언 타입
let id: number | string;

id = "user123";

// 7.
