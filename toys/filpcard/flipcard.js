const input = document.getElementById("input");
const playground = document.getElementById("playground");

// 레벨 변경 적용하기
input.addEventListener("change", function (event) {
  const level = event.target.value;

  // 변경 전 기본 기록 삭제하기
  playground.innerHTML = "";

  createCardGrid(level);
});

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
