const input = document.getElementById("input");
const playground = document.getElementById("playground");

// 기본 카드 레이아웃 적용하기
window.addEventListener("load", function () {
  const initialLevel = input.value;

  createCardGrid(initialLevel);
});

// 카드 그리드 생성
function createCardGrid(num) {
  let count = 1;

  playground.style.gridTemplateColumns = `repeat(${num}, 1fr)`;

  for (let row = 0; row < num; row++) {
    for (let col = 0; col < num; col++) {
      createCard(count);

      count++;
    }
  }
}

// 카드 생성
function createCard(num) {
  const card = document.createElement("div");

  card.setAttribute("class", "card");

  card.style.backgroundColor = getRandomColor();

  card.textContent = num;

  playground.appendChild(card);
}

// 렌덤 색상 생성
function getRandomColor() {
  const letters = "0123456789ABCDEF";

  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}
