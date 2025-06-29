// 아이템 배열
const items = [
  {
    name: "function",
    height: 300,
    icon: '<i class="fi fi-sc-function icon"></i>',
  },
  {
    name: "Rotate",
    height: 400,
    icon: '<i class="fi fi-rr-refresh icon"></i>',
  },
  {
    name: "test",
    height: 500,
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
    clone.style.height = `${rect.height}px`;
    clone.style.top = `${originTop}px`;
    clone.style.left = `${originLeft}px`;

    document.body.appendChild(clone);

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

  item.style.backgroundColor = getRandomColumn();

  item.style.height = `${items[num].height}px`;

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
