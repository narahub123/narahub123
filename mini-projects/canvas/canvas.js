window.addEventListener("load", function () {
  const parent = document.body;

  const canvas = createCanvas();

  parent.prepend(canvas);
});

// canvas 생성
function createCanvas() {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("id", "canvas");

  return canvas;
}
