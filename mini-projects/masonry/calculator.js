// 숫자 혹은 연산인지 구별하는 정규표현식
const available_regex = /[0-9-/.*%+]/;

// 입력된 값이 숫자인지 확인하는 정규표현식
const number_filter_regex = /[0-9]/;

// 등식의 마지막 값이 숫자인지 확인하는 정규 표현식
const last_character_regex = /[0-9]$/;

function createCalculator() {
  const calculator = document.createElement("div");
  calculator.className = "calculator";

  // display
  const display = document.createElement("div");
  display.className = "calculator__display";

  const wrapper = document.createElement("div");
  wrapper.className = "calculator__wrapper";

  const message = document.createElement("p");
  message.className = "calculator__message";

  wrapper.appendChild(message);
  display.appendChild(wrapper);

  // equation 영역
  const equationWrapper = document.createElement("div");
  equationWrapper.className = "calculator__text-wrapper";

  const equation = document.createElement("p");
  equation.className = "calculator__equation";
  equation.innerHTML = "<br />";

  equationWrapper.appendChild(equation);
  display.appendChild(equationWrapper);

  // result 영역
  const resultWrapper = document.createElement("div");
  resultWrapper.className = "calculator__text-wrapper";

  const result = document.createElement("p");
  result.className = "calculator__result";
  result.innerHTML = "<br />";

  resultWrapper.appendChild(result);
  display.appendChild(resultWrapper);

  calculator.appendChild(display);

  // 버튼 그룹
  const btns = document.createElement("div");
  btns.className = "calculator__btns";

  // 버튼 배열 (각 행마다 버튼 텍스트, modifier 포함)
  const buttons = [
    [
      { text: "C", mod: "gray" },
      { text: "CE", mod: "gray" },
      { text: "%", mod: "gray" },
      { text: "/", mod: "yellow" },
    ],
    [
      { text: "7", mod: "dark" },
      { text: "8", mod: "dark" },
      { text: "9", mod: "dark" },
      { text: "X", mod: "yellow" },
    ],
    [
      { text: "4", mod: "dark" },
      { text: "5", mod: "dark" },
      { text: "6", mod: "dark" },
      { text: "-", mod: "yellow" },
    ],
    [
      { text: "1", mod: "dark" },
      { text: "2", mod: "dark" },
      { text: "3", mod: "dark" },
      { text: "+", mod: "yellow" },
    ],
    [
      { text: "+/-", mod: "dark" },
      { text: "0", mod: "dark" },
      { text: ".", mod: "dark" },
      { text: "=", mod: "yellow" },
    ],
  ];

  buttons.forEach((row) => {
    const rowDiv = document.createElement("div");
    rowDiv.className = "calculator__row";

    row.forEach(({ text, mod }) => {
      const btn = document.createElement("button");
      btn.className = `calculator__btn calculator__btn--${mod}`;
      btn.textContent = text;
      btn.onclick = (event) => clickButton(event);
      rowDiv.appendChild(btn);
    });

    btns.appendChild(rowDiv);
  });

  calculator.appendChild(btns);

  return calculator;
}

function injectCalculatorStyles() {
  const style = document.createElement("style");
  style.textContent = `
.calculator {
  border: 1px solid #ccc;
  width: 100%;
  padding: 1rem;
  background-color: #000;
  box-sizing: border-box;
}

.calculator__display {
  width: 100%;
  height: 100px;
  background-color: #333;
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  gap: 5px;

  position: relative;
}

.calculator__wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.calculator__message {
  margin: 0;
  padding: 10px 20px;
  background-color: #fff;
  opacity: 0;
}

.calculator__text-wrapper {
  box-sizing: border-box;
  width: 100%;
  padding: 0 11px;
}

.calculator__equation {
  color: #ccc;
  margin: 0;
  font-size: 20px;
  line-height: 1;

  width: 100%;
  overflow: hidden;
  text-align: right;
}

.calculator__result {
  color: #fff;
  margin: 0;
  font-size: 50px;
  line-height: 1;

  width: 100%;
  overflow: hidden;
  text-align: right;
}

.calculator__btns {
  width: 100%;
  margin-top: 20px;
}

.calculator__row {
  display: flex;
  justify-content: space-around;
  gap: 10px;
  margin-top: 10px;
}

.calculator__btn {
  width: 100%;
  aspect-ratio: 1/1;
  padding: 10px;
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  cursor: pointer;
  user-select: none;

  transition: border-radius 0.3s ease-in-out, aspect-ratio 0.3s ease-in-out;
}

.calculator__btn--gray {
  background-color: #ddd;
  color: #fff;
}

.calculator__btn--gray:hover {
  background-color: #ccc;
}

.calculator__btn--gray:focus-visible {
  background-color: #ccc;
  outline: none;
}

.calculator__btn--yellow {
  background-color: orange;
  color: #fff;
}

.calculator__btn--yellow:hover {
  background-color: darkorange;
}

.calculator__btn--yellow:focus-visible {
  background-color: darkorange;
  outline: none;
}

.calculator__btn--dark {
  background-color: #777;
  color: #fff;
}

.calculator__btn--dark:hover {
  background-color: #666;
}

.calculator__btn--dark:focus-visible {
  background-color: #666;
  outline: none;
}

@media screen and (max-width: 500px) {
  .calculator__btn {
    border-radius: 50%;
    aspect-ratio: 1/1;
  }
}

@media screen and (min-width: 501px) {
  .calculator__btn {
    border-radius: 0.75rem;
    aspect-ratio: 4/3;
  }
}
  `;
  document.head.appendChild(style);
}

// 포커스 가능한 요소
const focusableSelectors = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
];

let calculator = null;

document.addEventListener("calculatorReady", (e) => {
  const calculatorElem = e.detail;

  calculator = calculatorElem;

  const focusableElems = calculatorElem.querySelectorAll(
    focusableSelectors.join(",")
  );

  const firstElem = focusableElems[0];

  // 포커스 주기
  firstElem.focus();
});

// 버튼 클릭 시 작동하는 함수 : onclick
function clickButton(event) {
  // 버튼 안의 기호 불러오기
  const symbol = convertInnerTextToSymbol(event.target.innerText);

  console.log(symbol);

  // 등식 불러오기
  const equation = calculator.querySelector(".calculator__equation");
  let text = equation.textContent || "";

  if (symbol === "clear") {
    // 전체 삭제
    clear();
  } else if (symbol === "clearEntry") {
    // 문자열의 마지막 삭제

    text = clearEntry(text);
  } else if (symbol === "unary") {
    // 변환
    console.log("변환");
  } else if (symbol === "=") {
    // 계산하기
    // 식이 숫자로 끝나지 않는 경우
    if (!isEndedWithNumber(text)) {
      if (!text) {
        const result = calculator.querySelector(".calculator__result");

        result.innerHTML = "<br />";
        return;
      }
      showMessage();
      return;
    }
    text = getResult(text);
  } else {
    if (!checkWrongEquation(symbol, text)) return;

    text += symbol;
  }

  // 등식에 심볼 추가하기
  text ? (equation.textContent = text) : (equation.innerHTML = "<br />");
}

// onkeydown 함수
function handleKeydown(event) {
  const key = event.key;
  // 영문 대소문자, 숫자, Backspace, shiftKey, -, +, /, ., *, %, Enter, 방향키, tab

  console.log(key);
  // 등식 불러오기
  const equation = calculator.querySelector(".calculator__equation");
  let text = equation.textContent || "";

  if ((event.shiftKey && key === "c") || key === "C") {
    event.preventDefault();
    // equation, result 삭제하기
    clear();
  } else if (key === "Backspace") {
    // 가장 마지막 문자 삭제하기
    text = clearEntry(text);
    // 기존에는 enter도 계산에 사용되었는데 포커스트랩 사용 후 삭제
  } else if (key === "=") {
    // 계산하기
    if (!text) {
      const result = calculator.querySelector(".calculator__result");

      result.innerHTML = "<br />";
      return;
    }
    // 식이 숫자로 끝나지 않는 경우
    if (!isEndedWithNumber(text)) {
      showMessage();
      return;
    }

    text = getResult(text);
  } else if (key === "ArrowRight") {
    const curIndex =
      [...focusableElems].findIndex((el) => el === document.activeElement) || 0;

    const postIndex =
      curIndex + 1 > focusableElems.length - 1 ? 0 : curIndex + 1;
    console.log(curIndex);

    focusableElems[postIndex].focus();
  } else if (key === "ArrowLeft") {
    const curIndex =
      [...focusableElems].findIndex((el) => el === document.activeElement) || 0;

    const prevIndex =
      curIndex - 1 < 0 ? focusableElems.length - 1 : curIndex - 1;

    focusableElems[prevIndex].focus();
  } else if (key === "ArrowUp") {
    event.preventDefault();
    const curIndex =
      [...focusableElems].findIndex((el) => el === document.activeElement) || 0;

    const prevIndex =
      curIndex - 4 < 0
        ? focusableElems.length - 1 - (3 - (curIndex % 4))
        : curIndex - 4;

    focusableElems[prevIndex].focus();
  } else if (key === "ArrowDown") {
    event.preventDefault();
    const curIndex =
      [...focusableElems].findIndex((el) => el === document.activeElement) || 0;

    const postIndex =
      curIndex + 4 > focusableElems.length - 1
        ? 0 + (curIndex % 4)
        : curIndex + 4;
    console.log(curIndex);

    focusableElems[postIndex].focus();
  } else {
    // 숫자와 연산자 인 경우에 출력
    if (isAvailableChar(key)) {
      // 식의 시작에서 +,-,.로 시작하는 경우를 제외하고는 연산자 앞에 숫자가 없는 경우 에러
      if (
        !(!text && ["-", "+", "."].includes(key)) &&
        !checkWrongEquation(key, text)
      ) {
        return;
      }

      text += key;
    } else {
      return;
    }
  }

  text ? (equation.textContent = text) : (equation.innerHTML = "<br />");
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
  const message = calculator.querySelector(".calculator__message");

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

function calcMultiplicativeOperators(text) {
  let formula = text;

  // 식 안에 *, /, %가 존재하는 동안 반복됨
  while (/[*/%]/.test(formula)) {
    // 곱셈형 연산자 추출
    const op = /[*/%]/.exec(formula);

    // 해당 곱셈형 연산자 앞 뒤의 숫자 추출 : 정수가 아닌 실수 추출

    // 곱셈형 연산자 이전 숫자 : 후방 탐색
    // 식의 시작이 +, -로 시작하는 경우 해당 부호를 포함해서 추출해야 함
    const prefixOperand =
      formula.startsWith("-") || formula.startsWith("+")
        ? /^[+-]?(?:\d+\.\d+|\d+|\.\d+)(?=[*/%])/.exec(formula)
        : /(?:\d+\.\d+|\d+|\.\d+)(?=[*/%])/.exec(formula);

    // 곱셈형 연산자 이후 숫자 : 전방 탐색
    const postfixOperand = /(?<=[*/%])(?:\d+\.\d+|\d+|\.\d+)/.exec(formula);

    // 해당 식 이전 문자열
    const foreText = formula.slice(0, prefixOperand.index);

    // 해당 식 이후 문자열
    const postText = formula.slice(
      postfixOperand.index + postfixOperand[0].length
    );

    // 추출한 식 계산
    const result = calc(op[0], prefixOperand[0], postfixOperand[0]);

    formula = foreText + result + postText;
  }

  return formula;
}

function getResult(text) {
  if (!text) return; // 메시지?

  const formula = calcMultiplicativeOperators(text);

  const value = calcAdditiveOperator(formula);

  // 결과
  const result = calculator.querySelector(".calculator__result");

  text ? (result.textContent = value) : (result.innerHTML = "<br />");

  return value;
}

function calcAdditiveOperator(text) {
  const numbers = extractNumber(text);
  const operators = extractOperator(text);

  let curIndex = 1;
  let result = Number(numbers[0]);

  while (curIndex < numbers.length) {
    result = calc(operators[curIndex - 1], result, Number(numbers[curIndex]));

    curIndex++;
  }

  return result;
}

// 등식에서 숫자만 추출
function extractNumber(text) {
  const results = [];
  let remaining = text;

  // 텍스트 - 혹은 +로 시작하는 경우 해당 부호를 포함해서 추출
  const firstMatch = remaining.match(/^[+-]?(?:\d+\.\d+|\d+|\.\d+)/);

  if (firstMatch) {
    results.push(firstMatch[0]);
    remaining = remaining.slice(firstMatch[0].length);
  }

  const rest = remaining.match(/(?:\d+\.\d+|\d+|\.\d+)/g);

  if (rest) {
    results.push(...rest);
  }

  return results;
}

// 등식에서 연산자만 추출
function extractOperator(text) {
  // 등식이 + 혹은 - 으로 시작하면 첫글자는 무시
  let startIndex = /^[+-]/.test(text) ? 1 : 0;

  const operatorRegex = /[+\-*/%]/g;
  const results = [];

  const slicedText = text.slice(startIndex);
  let match;
  while ((match = operatorRegex.exec(slicedText)) !== null) {
    results.push(match[0]);
  }

  return results;
}

// 계산 함수
function calc(op, operand1, operand2) {
  switch (op) {
    case "+":
      return operand1 + operand2;
    case "-":
      return operand1 - operand2;
    case "*":
      return operand1 * operand2;
    case "/":
      return operand1 / operand2;
    case "%":
      return operand1 % operand2;
  }
}

function clear() {
  const result = calculator.querySelector(".calculator__result");

  result.innerHTML = "<br />";

  const equation = calculator.querySelector(".calculator__equation");
  equation.innerHTML = "<br />";

  // 메시지 초기화
  const message = calculator.querySelector(".calculator__message");
  message.textContent = "";
  message.style.opacity = 0;
}
