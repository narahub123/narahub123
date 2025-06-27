const input = document.getElementById("input");
const playground = document.getElementById("playground");

// 맞춰야 하는 이미지 목록
const targets = [
  "🍉",
  "🍌",
  "🧅",
  "⭐",
  "😪",
  "🚀",
  "🎉",
  "👍",
  "🍆",
  "🥔",
  "🥑",
  "🍐",
  "🍅",
  "❤️",
  "🥕",
  "🍎",
  "😍",
  "👌",
  "🪼",
  "🐋",
  "🐬",
  "🦜",
  "🪽",
  "🐓",
  "🦅",
  "🕊️",
  "🧟‍♂️",
  "🕷️",
  "👄",
  "🧑‍🏭",
  "👩‍🚀",
  "🦹‍♀️",
  "🍦",
];

let selectedTargets = [];

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
  let count = 0;

  playground.style.gridTemplateColumns = `repeat(${num}, 1fr)`;

  getRandomTargets(num);

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

  // 카드 앞면 생성
  const front = document.createElement("div");
  front.style.backgroundColor = getRandomColor();
  front.setAttribute("class", "front");
  front.textContent = num + 1;

  // 카드 뒷면 생성
  const back = document.createElement("div");
  back.style.backgroundColor = "#28a745";
  back.setAttribute("class", "back");
  back.textContent = selectedTargets[num];

  card.appendChild(front);
  card.appendChild(back);

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

function getRandomTargets(num) {
  let randomTargets = [];

  while (randomTargets.length < (num * num) / 2) {
    const target = targets[Math.floor(Math.random() * targets.length)];

    if (randomTargets.includes(target)) {
      continue;
    }

    randomTargets.push(target);
  }

  // 중복된 목록 생성하기
  let duplicate = [...randomTargets, ...randomTargets];

  for (let i = 0; i < duplicate.length; i++) {
    const j = Math.floor(Math.random() * duplicate.length);

    [duplicate[j], duplicate[i]] = [duplicate[i], duplicate[j]];
  }

  selectedTargets = [...duplicate];
}
