window.addEventListener("load", function () {
  const parent = document.body;

  createCanvas(parent);
});

// canvas 생성
function createCanvas(parent) {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("id", "canvas");

  parent.prepend(canvas);
}
