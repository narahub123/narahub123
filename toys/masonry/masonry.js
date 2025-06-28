const numOfColumns = 4;

const numOfItems = 7;

window.addEventListener("DOMContentLoaded", function () {
  // body 가져오기
  const body = document.body;

  console.log(body);

  // layout 생성 및 body에 삽입
  const layout = document.createElement("div");
  layout.setAttribute("id", "layout");
  layout.style.gridTemplateColumns = `repeat(${numOfColumns}, 1fr)`;

  body.appendChild(layout);

  // colums 생성하기
  for (let i = 0; i < numOfItems; i++) {
    const item = document.createElement("div");
    item.setAttribute("class", "item");
    item.style.height = `${(i + 1) * 10}px`;
    item.style.backgroundColor = getRandomColumn();
    item.textContent = i;

    layout.appendChild(item);
  }

  masonryLayout(layout);

  layout.addEventListener("click", function (event) {
    const index = event.target.textContent;

    const items = document.getElementsByClassName("item");

    const item = items[index];

    // item.style.position = "absolute";
    item.style.top = "50%";
    item.style.left = "50%";
    item.style.transform = `scale(2) translate(50%, 50%)`;
  });
});

function getRandomColumn() {
  const letters = "0123456789ABCDEF";

  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }

  return color;
}
