const numOfColumns = 3;

const numOfItems = 10;

window.addEventListener("DOMContentLoaded", function () {
  // body 가져오기
  const body = document.body;

  console.log(body);

  // layout 생성 및 body에 삽입
  const layout = document.createElement("div");
  layout.setAttribute("id", "layout");
  //   layout.style.gridTemplateColumns = `repeat(${numOfColumns}, 1fr)`;

  body.appendChild(layout);

  // colums 생성하기
  for (let i = 0; i < numOfItems; i++) {
    const item = document.createElement("div");
    item.setAttribute("class", "item");
    item.style.height = `${(i + 1) * 200}px`;
    item.style.backgroundColor = getRandomColumn();

    item.innerHTML = '<i class="fi fi-rr-refresh icon"></i>';

    const title = document.createElement("p");
    title.setAttribute("class", "title");
    title.textContent = "Rotate";

    item.appendChild(title);

    layout.appendChild(item);
  }

  masonryLayout(layout);

  // 클릭 시 화면의 가운데로 이동
  //   layout.addEventListener("click", function (event) {
  //     const items = document.querySelectorAll(".item");

  //     // 모든 아이템에서 active 제거
  //     items.forEach((el) => el.classList.remove("active"));

  //     const target = event.target;

  //     // .item을 클릭한 경우에만 처리
  //     if (target.classList.contains("item")) {
  //       target.classList.add("active");
  //     }
  //   });

  //   layout.addEventListener("click", (e) => {
  //     const target = e.target;
  //     if (!target.classList.contains("item")) return;

  //     // 원본 위치 및 사이즈 측정
  //     const rect = target.getBoundingClientRect();

  //     const clone = target.cloneNode(true);
  //     clone.classList.add("floating");

  //     clone.style.width = `${rect.width}px`;
  //     clone.style.height = `${rect.height}px`;
  //     clone.style.top = `${rect.top + window.scrollY}px`;
  //     clone.style.left = `${rect.left + window.scrollX}px`;

  //     document.body.appendChild(clone);

  //     // transition 적용 위해 한 프레임 뒤에 실행
  //     requestAnimationFrame(() => {
  //       const centerX = window.innerWidth / 2 - rect.width / 2;
  //       const centerY = window.innerHeight / 2 - rect.height / 2;

  //       clone.style.top = `${centerY + window.scrollY}px`;
  //       clone.style.left = `${centerX + window.scrollX}px`;
  //       clone.style.transform = "scale(2)";
  //     });
  //   });

  let currentFloating = null;

  //   layout.addEventListener("click", (e) => {
  //     const target = e.target;

  //     // 아이템 클릭
  //     if (target.classList.contains("item")) {
  //       // 기존 floating 요소가 있다면 제거
  //       if (currentFloating) {
  //         currentFloating.element.remove();
  //         currentFloating = null;
  //       }

  //       // 위치 정보 측정
  //       const rect = target.getBoundingClientRect();
  //       const clone = target.cloneNode(true);
  //       clone.classList.add("floating");

  //       const originTop = rect.top + window.scrollY;
  //       const originLeft = rect.left + window.scrollX;

  //       // 초기 위치 설정
  //       clone.style.width = `${rect.width}px`;
  //       clone.style.height = `${rect.height}px`;
  //       clone.style.top = `${originTop}px`;
  //       clone.style.left = `${originLeft}px`;

  //       document.body.appendChild(clone);

  //       // 한 프레임 후 중앙으로 이동
  //       requestAnimationFrame(() => {
  //         const centerX = window.innerWidth / 2 - rect.width / 2;
  //         const centerY = window.innerHeight / 2 - rect.height / 2;

  //         clone.style.top = `${centerY + window.scrollY}px`;
  //         clone.style.left = `${centerX + window.scrollX}px`;
  //         clone.style.transform = "scale(2)";
  //       });

  //       currentFloating = {
  //         element: clone,
  //         originalTop: originTop,
  //         originalLeft: originLeft,
  //       };
  //     }

  //     // 아이템이 아닌 영역 클릭
  //     else if (currentFloating) {
  //       const { element, originalTop, originalLeft } = currentFloating;

  //       // 복귀
  //       element.style.transform = "scale(1)";
  //       element.style.top = `${originalTop}px`;
  //       element.style.left = `${originalLeft}px`;

  //       element.addEventListener(
  //         "transitionend",
  //         () => {
  //           element.remove();
  //         },
  //         { once: true }
  //       );

  //       currentFloating = null;
  //     }
  //   });

  layout.addEventListener("click", (e) => {
    const target = e.target;

    if (target.classList.contains("item")) {
      const rect = target.getBoundingClientRect();

      if (currentFloating) {
        const { element, originalTop, originalLeft } = currentFloating;

        // 기존 떠 있던 아이템 원래 위치로 복귀
        element.style.transform = "scale(1)";
        element.style.top = `${originalTop}px`;
        element.style.left = `${originalLeft}px`;

        // 복귀 애니메이션 끝난 뒤 제거
        element.addEventListener(
          "transitionend",
          () => {
            element.remove();

            // 새 아이템 중앙 이동 처리
            createAndMoveClone(target, rect);
          },
          { once: true }
        );

        currentFloating = null;
      } else {
        // 기존 떠 있는 아이템 없으면 바로 새 아이템 중앙 이동
        createAndMoveClone(target, rect);
      }
    } else if (currentFloating) {
      // 아이템 아닌 곳 클릭 시 기존 떠 있던 아이템 원위치 복귀 및 제거
      const { element, originalTop, originalLeft } = currentFloating;

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

      currentFloating = null;
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
      clone.style.transform = "scale(2)";
    });

    currentFloating = {
      element: clone,
      originalTop: originTop,
      originalLeft: originLeft,
    };
  }
});

function getRandomColumn() {
  const letters = "0123456789ABCDEF";

  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }

  return color;
}

function masonryLayout(layout) {
  const layoutStyle = getComputedStyle(layout);

  const rowHeight = parseInt(layoutStyle.getPropertyValue("grid-auto-rows"));
  const rowGap = parseInt(layoutStyle.getPropertyValue("row-gap"));

  document.querySelectorAll(".item").forEach((item) => {
    const height = item.getBoundingClientRect().height;
    const span = Math.ceil((height + rowGap) / (rowHeight + rowGap));
    item.style.gridRowEnd = `span ${span}`;
  });
}
