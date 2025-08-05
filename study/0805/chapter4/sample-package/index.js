// 모듈을 require 함수로 포함시킬 때 실행
console.log("require로 부르면 실행됩니다.");

// 외부로 노출될 객체 저장
module.exports = {
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
  multi: (a, b) => a * b,
  div: (a, b) => a / b,
};
