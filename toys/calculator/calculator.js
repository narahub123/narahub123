// 너비에 따라서 표시되는 숫자 다르게 처리하기

// 숫자 혹은 연산인지 구별하는 정규표현식
const available_regex = /[0-9-/*%+.]/;

// 버튼 클릭 시 작동하는 함수 : onclick
function clickButton(event) {
  // 버튼 안의 기호 불러오기
  const symbol = convertInnerTextToSymbol(event.target.innerText);

  console.log(symbol);

  // 등식 불러오기
  const equation = document.getElementById("equation");
  let text = equation.textContent || "";

  if (symbol === "clear") {
    // 전체 삭제
    console.log("전체 삭제");
  } else if (symbol === "clearEntry") {
    // 문자열의 마지막 삭제
    console.log("문자열의 마지막 삭제");
  } else if (symbol === "unary") {
    // 변환
    console.log("변환");
  } else if (symbol === "=") {
    // 계산하기
    console.log("계산하기");
  } else {
    console.log("숫자 혹은 연산자");
    text += symbol;
  }

  // 등식에 심볼 추가하기
  equation.textContent = text;
}

// onkeydown 함수
function handleKeydown(event) {
  const key = event.key;
  // 영문 대소문자, 숫자, Backspace, shiftKey, -, +, /, ., *, %, Enter, 방향키, tab

  console.log(key);
  // 등식 불러오기
  const equation = document.getElementById("equation");
  let text = equation.textContent || "";

  if ((event.shiftKey && key === "c") || key === "C") {
    event.preventDefault();
    // equation, result 삭제하기
    console.log("전체 삭제");
  } else if (key === "Backspace") {
    // 가장 마지막 문자 삭제하기
    console.log("마지막 문자열 삭제");
  } else if (key === "=") {
    // 계산하기
    console.log("계산하기");
  } else {
    // 숫자와 연산자 인 경우에 출력
    console.log("문자 클릭");
    if (isAvailableChar(key)) {
      text += key;
    }
  }

  equation.textContent = text;
}

window.addEventListener("keydown", handleKeydown);

// 버튼의 내용을 기호로 변경하기
function convertInnerTextToSymbol(innerText) {
  switch (innerText) {
    case "CE":
      return "clearEntry";

    case "C":
      return "clear";

    case "+/-":
      return "unary";

    default:
      return innerText;
  }
}

function isAvailableChar(char) {
  console.log(char);

  return available_regex.test(char);
}
