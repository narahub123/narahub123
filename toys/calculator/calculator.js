// 너비에 따라서 표시되는 숫자 다르게 처리하기

// 버튼 클릭 시 작동하는 함수 : onclick
function clickButton(event) {
  // 버튼 안의 기호 불러오기
  const symbol = convertInnerTextToSymbol(event.target.innerText);

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
  }
}

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

// onkeydown 함수
function handleKeydown(event) {
  const key = event.key;
  // 영문 대소문자, 숫자, Backspace, shiftKey, -, +, /, ., *, %, Enter, 방향키, tab

  console.log(key);

  if (event.shiftKey) {
    console.log("shift 눌림");

    if (key === "c" || key === "C") {
      // equation, result 삭제하기
      console.log("전체 삭제");
    }
  } else if (key === "Backspace") {
    // 가장 마지막 문자 삭제하기
    console.log("마지막 문자열 삭제");
  } else if (key === "=") {
    // 계산하기
    console.log("계산하기");
  } else {
    // 숫자와 연산자 인 경우에 출력
    console.log("문자 클릭");
  }
}

window.addEventListener("keydown", handleKeydown);
