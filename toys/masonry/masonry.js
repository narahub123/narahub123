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
];

const layout = document.querySelector("#layout");
console.log(layout);

window.addEventListener("load", function () {
  for (let i = 0; i < items.length; i++) {
    const item = createItem();
    console.log(item);

    layout.appendChild(item);
  }
});

function createItem() {
  const item = document.createElement("div");

  item.setAttribute("class", "item");

  item.style.backgroundColor = "lightblue";

  return item;
}
