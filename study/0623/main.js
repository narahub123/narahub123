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
// let price = 10000;
// let rate = 0.2;
// let discount = price * rate;
// let finalPrice = price - discount;

// console.log("할인된 가격은 " + finalPrice + "원입니다.");

// 템플릿 리터럴
// let name = "영희";
// console.log(`안녕하세요. ${name}님!`);
// console.log("안녕하세요. " + name + "님!");

// 실습 : 복합 연산자
// let a = 10;
// console.log(a);

// a += 5;
// console.log(a);

// a -= 3;
// console.log(a);

// a *= 2;
// console.log(a);

// a /= 4;
// console.log(a);

// console.log(`최종 값은 ${a}입니다.`);

// 1. 이름과 나이를 입력받아 인사말 출력하기 => confirm + alert
// let userName = prompt("이름을 입력헤주세요.");
// let userAge = prompt("나이를 입력헤주세요.");

// alert(`안녕하세요. ${userName}님.\n당신의 나이는 ${userAge}입니다.`);

// 2. 두 수를 입력 받아 사칙 연산 결과를 각각 출력하시오
// let left = Number(prompt("숫자를 입력해주세요"));
// let right = Number(prompt("다른 숫자를 입력해주세요."));

// alert(
//   `${left} + ${right} = ${left + right} \n${left} - ${right} = ${
//     left - right
//   } \n${left} * ${right} = ${left * right}\n${left} / ${right} = ${
//     left / right
//   }`
// );

// 3. == vs === 비교 실험하기
// console.log(`1 == "1"은 ${1 == "1"}`);
// console.log(`1 === "1"은 ${1 === "1"}`);

// if 문 실습 : 3의 배수 검사기
// let num = prompt("숫자를 입력하세요.");

// if (num % 3 === 0) {
//   alert("3의 배수입니다.");
// } else {
//   alert("3의 배수가 아닙니다.");
// }

// switch 문 실습 :
// let day = prompt("요일을 입력하세요.");

// switch (day) {
//   case "월요일":
//     alert("한 주의 시작!");
//     break;
//   case "금요일":
//     alert("불타는 금요일!");
//     break;
//   default:
//     alert("평범한 하루네요.");
// }

// 연습 문제
// 변수
// 1. 숫자 두 개를 변수로 저장하고 더한 결과를 출력해보세요.
// let a = 5;
// let b = 3;

// console.log("두 값의 합은 " + (a + b) + "입니다");

// // 2. 이름과 나이를 저장하고 다음과 같은 문장을 출력해보세요. "홍길동님은 20살입니다."
// let name = "홍길동";
// let age = 20;

// console.log(`${name}은 ${age}살입니다.`);

// // 3. 정사각형의 한 변 길이를 변수로 저장하고 넓이를 출력해보세요.
// let side = 4;
// console.log("정사각형의 넓이는 " + side * side + "입니다.");

// 조건문
// 4. 숫자 하나가 짝수인지 홀수인지 출력해보세요.
// let number = Number(prompt("숫자를 입력하세요."));
// if (number % 2 === 0) {
//   alert("짝수입니다.");
// } else {
//   alert("홀수입니다.");
// }

// // 5. 나이에 따라 아래 문장을 출력해보세요.
// let age = Number(prompt("나이를 입력하세요."));
// if (age < 19) {
//   alert("미성년자입니다.");
// } else {
//   alert("성인입니다.");
// }

// // 6. 비밀번호가 맞는지 확인하는 코드를 작성해보세요.
// let password = "1234";
// let input = prompt("비밀번호를 입력하세요.");

// if (password === input) {
//   alert("로그인 성공");
// } else {
//   alert("로그인 실패");
// }


