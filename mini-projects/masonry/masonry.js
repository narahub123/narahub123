// 아이템 배열
const items = [
  {
    name: "function",
    height: 463,
    icon: '<i class="fi fi-sc-function icon"></i>',
    theme: "Calculator",
  },
  {
    name: "Rotate",
    height: 400,
    icon: '<i class="fi fi-rr-refresh icon"></i>',
    theme: "Memory Game",
  },
  {
    name: "DFS",
    height: 400,
    icon: '<i class="fi fi-rr-refresh icon"></i>',
    theme: "Ghost Leg Game",
  },
  {
    name: "test",
    height: 200,
  },
  {
    name: "test",
    height: 200,
  },
  {
    name: "test",
    height: 500,
  },
  {
    name: "test",
    height: 400,
  },
  {
    name: "test",
    height: 300,
  },
  {
    name: "test",
    height: 200,
  },
];

const layout = document.querySelector("#layout");
console.log(layout);

window.addEventListener("load", function () {
  for (let i = 0; i < items.length; i++) {
    const item = createItem(i);
    console.log(item);

    layout.appendChild(item);
  }

  masonryLayout(layout);

  window.currentFloating = null;

  window.addEventListener("keydown", function (e) {
    const key = e.key;

    if (key === "Escape") {
      if (window.currentFloating) {
        const { element, originalTop, originalLeft } = window.currentFloating;

        // 기존 떠 있던 아이템 원래 위치로 복귀
        element.style.transform = "scale(1)";
        element.style.top = `${originalTop}px`;
        element.style.left = `${originalLeft}px`;

        // 복귀 애니메이션 끝난 뒤 제거
        element.addEventListener(
          "transitionend",
          () => {
            element.remove();
          },
          { once: true }
        );

        window.currentFloating = null;
      }
    }
  });

  layout.addEventListener("click", (e) => {
    const target = e.target;

    if (target.classList.contains("item")) {
      const rect = target.getBoundingClientRect();

      if (window.currentFloating) {
        const { element, originalTop, originalLeft } = window.currentFloating;

        // 기존 떠 있던 아이템 원래 위치로 복귀
        element.style.transform = "scale(1)";
        element.style.top = `${originalTop}px`;
        element.style.left = `${originalLeft}px`;

        // 복귀 애니메이션 끝난 뒤 제거
        element.addEventListener(
          "transitionend",
          () => {
            element.remove();
          },
          { once: true }
        );

        window.currentFloating = null;
      } else {
        // 기존 떠 있는 아이템 없으면 바로 새 아이템 중앙 이동
        createAndMoveClone(target, rect);
      }
    } else if (window.currentFloating) {
      // 아이템 아닌 곳 클릭 시 기존 떠 있던 아이템 원위치 복귀 및 제거
      const { element, originalTop, originalLeft } = window.currentFloating;

      element.style.transform = "scale(1)";
      element.style.top = `${originalTop}px`;
      element.style.left = `${originalLeft}px`;

      element.addEventListener(
        "transitionend",
        () => {
          element.remove();
        },
        { once: true }
      );

      window.currentFloating = null;
    }
  });

  function createAndMoveClone(target, rect) {
    const clone = target.cloneNode(true);
    clone.classList.add("floating");

    const originTop = rect.top + window.scrollY;
    const originLeft = rect.left + window.scrollX;

    clone.style.width = `${rect.width}px`;
    clone.style.top = `${originTop}px`;
    clone.style.left = `${originLeft}px`;

    document.body.appendChild(clone);

    // transitionend 이벤트 등록
    clone.addEventListener(
      "transitionend",
      () => {
        if (clone.dataset.theme === "function") {
          insertCalculatorIntoFloating(clone);
        } else if (clone.dataset.theme === "rotate") {
          // 원하는 너비 (픽셀 단위)
          const newWidth = 600; // 화면 가로의 80%
          const newHeight = 600; // 화면 가로의 80%

          clone.style.width = `${newWidth}px`;
          clone.style.height = `${newHeight}px`;

          // 너비 변화에 맞게 left 조정 (중앙 정렬 유지)
          const centerX = window.innerWidth / 2;
          const newLeft = centerX - newWidth / 2;
          const centerY = window.innerHeight / 2;
          const newTop = centerY - newHeight / 2;

          clone.style.left = `${newLeft + window.scrollX}px`;
          clone.style.top = `${newTop + window.scrollY}px`;

          insertMemoryGameIntoFloating(clone);
        } else if (clone.dataset.theme === "dfs") {
          // 원하는 너비 (픽셀 단위)
          const newWidth = 600; // 화면 가로의 80%
          const newHeight = 600; // 화면 가로의 80%

          clone.style.width = `${newWidth}px`;
          clone.style.height = `${newHeight}px`;

          // 너비 변화에 맞게 left 조정 (중앙 정렬 유지)
          const centerX = window.innerWidth / 2;
          const newLeft = centerX - newWidth / 2;
          const centerY = window.innerHeight / 2;
          const newTop = centerY - newHeight / 2;

          clone.style.left = `${newLeft + window.scrollX}px`;
          clone.style.top = `${newTop + window.scrollY}px`;

          insertGhostLegIntoFloating(clone);
        }
      },
      { once: true } // 한 번만 실행하도록
    );

    requestAnimationFrame(() => {
      const centerX = window.innerWidth / 2 - rect.width / 2;
      const centerY = window.innerHeight / 2 - rect.height / 2;

      clone.style.top = `${centerY + window.scrollY}px`;
      clone.style.left = `${centerX + window.scrollX}px`;
      // clone.style.transform = "scale(2)";
    });

    window.currentFloating = {
      element: clone,
      originalTop: originTop,
      originalLeft: originLeft,
    };
  }
});

function createItem(num) {
  const item = document.createElement("div");

  item.setAttribute("class", "item");

  if (items[num].theme) {
    item.dataset.theme = items[num].name?.toLowerCase();
  }

  item.style.backgroundColor = getRandomColumn();

  item.style.height = `${items[num].height}px`;

  if (items[num].icon) {
    item.innerHTML = items[num].icon;
  }

  const label = document.createElement("p");

  label.setAttribute("class", "label");

  label.textContent = items[num].name;

  item.appendChild(label);

  if (items[num].theme) {
    const theme = document.createElement("p");

    theme.setAttribute("class", "theme");

    theme.textContent = items[num].theme;

    item.appendChild(theme);
  }

  return item;
}

function masonryLayout(layout) {
  const layoutStyle = getComputedStyle(layout);

  const rowHeight = parseInt(layoutStyle.getPropertyValue("grid-auto-rows"));
  const rowGap = parseInt(layoutStyle.getPropertyValue("row-gap"));

  const items = document.querySelectorAll(".item");

  items.forEach((item) => {
    const height = item.getBoundingClientRect().height;
    const span = Math.ceil((height + rowGap) / (rowHeight + rowGap));

    item.style.gridRowEnd = `span ${span}`;
  });
}

function getRandomColumn() {
  const letters = "0123456789ABCDEF";

  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }

  return color;
}

function insertCalculatorIntoFloating(floatingElem) {
  // 예: 기존 floating 내부 내용 지우기
  floatingElem.innerHTML = "";

  // 계산기 DOM 생성 (직접 만든 함수 또는 외부에서 생성)
  const calculatorElem = createCalculator();

  injectCalculatorStyles();

  floatingElem.appendChild(calculatorElem);

  // 생성 완료 이벤트 발생
  document.dispatchEvent(
    new CustomEvent("calculatorReady", { detail: calculatorElem })
  );
}

function insertMemoryGameIntoFloating(floatingElem) {
  // 예: 기존 floating 내부 내용 지우기
  floatingElem.innerHTML = "";

  // 계산기 DOM 생성 (직접 만든 함수 또는 외부에서 생성)
  const memoryGame = createMemoryGame();

  injuectMemoryGameStyles();

  floatingElem.appendChild(memoryGame);

  // 생성 완료 이벤트 발생
  document.dispatchEvent(
    new CustomEvent("memoryGameReady", { detail: memoryGame })
  );
}

function insertGhostLegIntoFloating(floatingElem) {
  // 예: 기존 floating 내부 내용 지우기
  floatingElem.innerHTML = "";

  // 계산기 DOM 생성 (직접 만든 함수 또는 외부에서 생성)
  const ghostLegElem = createGhostLeg();

  floatingElem.appendChild(ghostLegElem);

  // 생성 완료 이벤트 발생
  document.dispatchEvent(
    new CustomEvent("ghostGameReady", { detail: ghostLegElem })
  );
}

window.addEventListener("resize", () => {
  if (window.currentFloating) {
    const { element } = window.currentFloating;

    // 현재 너비/높이 구하기 (픽셀 단위)
    const width = element.offsetWidth;
    const height = element.offsetHeight;

    centerFloatingElement(element, width, height);
  }
});

// floating clone이 너비/높이 변할 때 중앙 유지 함수
function centerFloatingElement(clone, width, height) {
  // 화면 가운데 좌표
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // left, top 계산 (중앙 기준 좌표 - 요소 절반 크기)
  const newLeft = centerX - width / 2;
  const newTop = centerY - height / 2;

  // 위치 지정 (스크롤 위치 고려)
  clone.style.left = `${newLeft + window.scrollX}px`;
  clone.style.top = `${newTop + window.scrollY}px`;
}
