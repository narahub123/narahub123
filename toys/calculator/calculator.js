function clickButton(event) {
  // 버튼 안의 기호 불러오기
  const symbol = convertInnerTextToSymbol(event.target.innerText);

  console.log(symbol);
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
