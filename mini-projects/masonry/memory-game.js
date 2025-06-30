function createMemoryGame() {
  const memory_game = document.createElement("div");
  memory_game.className = "memory-game";

  // controls
  const controls = document.createElement("div");
  controls.className = "memory-game__controls";

  // select
  const select = document.createElement("select");
  select.className = "memory-game__select";
  select.name = "level";
  select.id = "level";

  const defaultOption = document.createElement("option");
  defaultOption.value = "0";
  defaultOption.textContent = "레벨을 선택해주세요";
  select.appendChild(defaultOption);

  const levelOptions = [
    { value: "2", label: "lv. 1" },
    { value: "4", label: "lv. 2" },
    { value: "6", label: "lv. 3" },
    { value: "8", label: "lv. 4" },
  ];

  for (const opt of levelOptions) {
    const option = document.createElement("option");
    option.value = opt.value;
    option.textContent = opt.label;
    select.appendChild(option);
  }

  // button
  const button = document.createElement("button");
  button.className = "memory-game__start-btn";
  button.id = "btn";
  button.textContent = "게임 시작";

  // paragraph
  const remaining = document.createElement("p");
  remaining.className = "memory-game__remaining";
  remaining.id = "remaining";
  remaining.innerHTML = `남은 카드 수 : <span id="reNum" class="memory-game__renum"></span>`;

  // controls 조립
  controls.appendChild(select);
  controls.appendChild(button);
  controls.appendChild(remaining);

  // lower
  const lower = document.createElement("div");
  lower.className = "memory-game__lower";

  const playground = document.createElement("div");
  playground.className = "memory-game__playground";
  playground.id = "playground";

  lower.appendChild(playground);

  // memory_game 조립
  memory_game.appendChild(controls);
  memory_game.appendChild(lower);

  return memory_game;
}

function injuectMemoryGameStyles() {
  const style = document.createElement("style");
  style.textContent = `
    .memory-game {
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 1.5rem;
      width: 100%;
      height: 100%;
    }

    .memory-game__controls {
      display: flex;
    }

    .memory-game__remaining {
      display: none;
      margin: 0;
    }

    .memory-game__lower {
      box-sizing: border-box;
      width: 70%;
      height: 70%;
      padding: 1rem;
    }

    .memory-game__playground {
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 0.5rem;
      background-color: #f0f0f0;
      padding: 0.5rem;
      display: grid;
      gap: 0.5rem;
    }

    .memory-game__card {
      width: 100%;
      aspect-ratio: 1/1;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.5rem;
      position: relative;
      transform-style: preserve-3d;
      transition: transform 0.6s;
    }

    .memory-game__card--disabled {
      opacity: 0.7;
    }

    .memory-game__card--disabled .memory-game__card-front {
      cursor: default;
    }

    .memory-game__card-front,
    .memory-game__card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.5rem;
      backface-visibility: hidden;
    }

    .memory-game__card-front {
      cursor: pointer;
    }

    .memory-game__card-back {
      transform: rotateY(180deg);
    }

    .memory-game__card--open {
      transform: rotateY(180deg);
    }

    .memory-game__card--correct {
      opacity: 0.5;
    }

    .memory-game__option {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .memory-game__option--disabled {
      background-color: #f0f0f0;
    }
  `;

  document.head.appendChild(style);
}

let memoryGame = null;

document.addEventListener("memoryGameReady", (e) => {
  const memoryGameElem = e.detail;

  let level = memoryGameElem.querySelector(".memory-game__select");
  let playground = memoryGameElem.querySelector(".memory-game__playground");
  let remaining = memoryGameElem.querySelector(".memory-game__remaining");
  let btn = memoryGameElem.querySelector(".memory-game__start-btn");
  let reNum = memoryGameElem.querySelector(".memory-game__renum");

  let flippedCards = [];
  let isPlaying = false;
  let selectedTargets = [];

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

  btn.addEventListener("click", function () {
    isPlaying = true;

    const cards = playground.getElementsByClassName("memory-game__card");
    Array.from(cards).forEach((card) =>
      card.classList.remove("memory-game__card--disabled")
    );

    level.style.display = "none";
    btn.style.display = "none";
    remaining.style.display = "flex";

    reNum.textContent = Math.pow(level.value, 2) / 2;
  });

  playground.addEventListener("click", function (event) {
    if (!isPlaying) return;
    if (flippedCards.length > 1) return;

    if (event.target.classList.contains("memory-game__card-back")) return;

    // 클릭한 카드 요소 찾기
    let cardElem = event.target;
    while (cardElem && !cardElem.classList.contains("memory-game__card")) {
      cardElem = cardElem.parentElement;
    }
    if (!cardElem) return;

    const frontElem = cardElem.querySelector(".memory-game__card-front");
    if (!frontElem) return;
    const index = Number(frontElem.textContent) - 1;
    if (Number.isNaN(index)) return;

    // 뒤집힌 카드 배열에 추가
    flippedCards.push(index);

    cardElem.classList.add("memory-game__card--open");

    if (flippedCards.length === 2) {
      setTimeout(() => {
        const cards = playground.getElementsByClassName("memory-game__card");
        const image0 = cards[flippedCards[0]].querySelector(
          ".memory-game__card-back"
        ).textContent;
        const image1 = cards[flippedCards[1]].querySelector(
          ".memory-game__card-back"
        ).textContent;

        if (image0 === image1) {
          // 맞춘 카드 처리
          cards[flippedCards[0]]
            .querySelector(".memory-game__card-back")
            .classList.add("memory-game__card--correct");
          cards[flippedCards[1]]
            .querySelector(".memory-game__card-back")
            .classList.add("memory-game__card--correct");

          // 남은 카드 수 감소
          let count = Number(reNum.textContent) - 1;
          reNum.textContent = count;

          if (count === 0) {
            alert(`lv. ${level.value / 2}를 완료했습니다.`);
            isPlaying = false;

            Array.from(cards).forEach((card) =>
              card.classList.add("memory-game__card--disabled")
            );

            level.style.display = "block";
            btn.style.display = "block";
            remaining.style.display = "none";

            playground.innerHTML = "";

            const completeds = memoryGameElem.querySelectorAll(".completed");
            if (completeds[level.value / 2 - 1]) {
              completeds[level.value / 2 - 1].textContent = "completed";
            }

            const options = memoryGameElem.querySelectorAll("option");
            if (options[level.value / 2]) {
              options[level.value / 2].disabled = true;
              options[level.value / 2].classList.add("option-disabled");
            }
          }
        } else {
          // 틀린 카드 뒤집기 해제
          cards[flippedCards[0]].classList.remove("memory-game__card--open");
          cards[flippedCards[1]].classList.remove("memory-game__card--open");
        }

        flippedCards = [];
      }, 1000);
    }
  });

  level.addEventListener("change", (event) => {
    playground.innerHTML = "";
    createCardGrid(event.target.value);
  });

  window.addEventListener("load", () => {
    if (!isPlaying) {
      remaining.style.display = "none";
    }
    createCardGrid(level.value);
  });

  function createCardGrid(num) {
    if (!num || num == 0) return;

    playground.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
    playground.style.fontSize = `${6 - num / 2}rem`;

    getRandomTargets(num);

    let count = 0;
    for (let row = 0; row < num; row++) {
      for (let col = 0; col < num; col++) {
        createCard(count);
        count++;
      }
    }
  }

  function createCard(num) {
    const card = document.createElement("div");
    card.className = "memory-game__card memory-game__card--disabled";

    const front = document.createElement("div");
    front.className = "memory-game__card-front";
    front.style.backgroundColor = getRandomColor();
    front.textContent = num + 1;

    const back = document.createElement("div");
    back.className = "memory-game__card-back";
    back.style.backgroundColor = "#28a745";
    back.textContent = selectedTargets[num];

    card.appendChild(front);
    card.appendChild(back);

    playground.appendChild(card);
  }

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
      if (!randomTargets.includes(target)) {
        randomTargets.push(target);
      }
    }

    let duplicate = [...randomTargets, ...randomTargets];

    for (let i = duplicate.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [duplicate[i], duplicate[j]] = [duplicate[j], duplicate[i]];
    }

    selectedTargets = duplicate;
  }
});
