// 너비에 따라서 표시되는 숫자 다르게 처리하기

// 숫자 혹은 연산인지 구별하는 정규표현식
const available_regex = /[0-9-/.*%+]/;

// 입력된 값이 숫자인지 확인하는 정규표현식
const number_filter_regex = /[0-9]/;

// 등식의 마지막 값이 숫자인지 확인하는 정규 표현식
const last_character_regex = /[0-9]$/;

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

    text = clearEntry(text);
  } else if (symbol === "unary") {
    // 변환
    console.log("변환");
  } else if (symbol === "=") {
    // 계산하기
    console.log("계산하기");
  } else {
    if (!checkWrongEquation(symbol, text)) return;

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
    text = clearEntry(text);
  } else if (key === "=") {
    // 계산하기
    console.log("계산하기");
  } else {
    // 숫자와 연산자 인 경우에 출력
    if (isAvailableChar(key)) {
      if (!checkWrongEquation(key, text)) return;

      text += key;
    } else {
      return;
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

    case "X":
      return "*";

    default:
      return innerText;
  }
}

function isAvailableChar(char) {
  return available_regex.test(char);
}

function isInputNumber(input) {
  return number_filter_regex.test(input);
}

function isEndedWithNumber(text) {
  return last_character_regex.test(text);
}

function checkWrongEquation(input, text) {
  if (!isInputNumber(input) && !isEndedWithNumber(text)) {
    showMessage();

    return false;
  }

  return true;
}

function showMessage() {
  const message = document.getElementById("message");

  message.style.opacity = 1;

  const msg = "완성되지 않은 수식입니다.";
  message.textContent = msg;

  let timer;

  if (timer) {
    clearTimeout(timer);
  }

  timer = setTimeout(() => {
    message.textContent = "";
    message.style.opacity = 0;
  }, 2000);
}

// text의 마지막 글자를 지우는 함수
function clearEntry(text) {
  if (!text) return;
  return text.slice(0, text.length - 1);
}
