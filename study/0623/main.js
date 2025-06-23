// alert("Hello, world!!!");
// console.log("Hello, world!!");
// document.write("<h1>Document Write</h1>");

// 변수 실습
// let currentYear = 2025;
// let birthYear = prompt("태어날 해를 입력하세요.");
// let age = currentYear - birthYear + 1;

// alert("당신의 나이는 " + age + "살입니다.");

// 자료형 실습
// let name = "철수";
// let age = 20;
// let isStudent = true;

// console.log(typeof name); // string
// console.log(typeof age); // number
// console.log(typeof isStudent); // boolean

// 연산자 실습
let price = 10000;
let rate = 0.2;
let discount = price * rate;
let finalPrice = price - discount;

console.log("할인된 가격은 " + finalPrice + "원입니다.");

// 템플릿 리터럴
let name = "영희";
console.log(`안녕하세요. ${name}님!`);
console.log("안녕하세요. " + name + "님!");

// 실습 : 복합 연산자
let a = 10;
console.log(a);

a += 5;
console.log(a);

a -= 3;
console.log(a);

a *= 2;
console.log(a);

a /= 4;
console.log(a);

console.log(`최종 값은 ${a}입니다.`);

// 1. 이름과 나이를 입력받아 인사말 출력하기 => confirm + alert
let userName = prompt("이름을 입력헤주세요.");
let userAge = prompt("나이를 입력헤주세요.");

alert(`안녕하세요. ${userName}님.\n당신의 나이는 ${userAge}입니다.`);

// 2. 두 수를 입력 받아 사칙 연산 결과를 각각 출력하시오
let left = Number(prompt("숫자를 입력해주세요"));
let right = Number(prompt("다른 숫자를 입력해주세요."));

alert(
  `${left} + ${right} = ${left + right} \n${left} - ${right} = ${
    left - right
  } \n${left} * ${right} = ${left * right}\n${left} / ${right} = ${
    left / right
  }`
);

// 3. == vs === 비교 실험하기
console.log(`1 == "1"은 ${1 == "1"}`);
console.log(`1 === "1"은 ${1 === "1"}`);
