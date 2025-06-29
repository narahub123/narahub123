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
});

function createItem(num) {
  const item = document.createElement("div");

  item.setAttribute("class", "item");

  item.style.backgroundColor = "lightblue";

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
