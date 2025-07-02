let canvas, ctx;

const centerX = 150;
const centerY = 150;
const sides = 8;
const angle = (2 * Math.PI) / sides;
const radiusArr = [25, 50, 75, 100];
const textArr = [
  "협업",
  "성장",
  "동기부여",
  "개인생활",
  "건강",
  "그밖",
  "졸림",
  "그럼",
];
const outerRadius = Math.max(...radiusArr);
let currentNumber = 0;
const stats = [
  [40, 40, 80, 60, 77, 100, 45, 88],
  [67, 90, 10, 20, 45, 76, 20, 58],
];

window.addEventListener("load", function () {
  const parent = document.body;

  const button = document.createElement("button");

  button.setAttribute("id", "btn");

  button.textContent = "변경";

  button.onclick = changeStat;

  parent.prepend(button);

  canvas = createCanvas(300, 300);
  ctx = canvas.getContext("2d");
  parent.prepend(canvas);

  drawBase();
  createStatPolygon(stats[currentNumber]);
});

function createCanvas(width, height) {
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  c.id = "myCanvas";
  return c;
}

function offset(index) {
  return index === 0 ? 10 : 20;
}

function drawBase() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const radius of radiusArr) {
    createPolygon(radius);
  }
  addVertexTexts(outerRadius);
}

function createPolygon(radius) {
  ctx.beginPath();
  for (let i = 0; i <= sides; i++) {
    const x = centerX + radius * Math.cos(i * angle - Math.PI / 2);
    const y = centerY + radius * Math.sin(i * angle - Math.PI / 2);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.strokeStyle = "#ddd";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = "transparent";
  ctx.fill();
}

function addVertexTexts(radius) {
  ctx.font = "12px Arial";
  ctx.fillStyle = "#000";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (let i = 0; i < sides; i++) {
    const x =
      centerX + (radius + offset(i)) * Math.cos(i * angle - Math.PI / 2);
    const y =
      centerY + (radius + offset(i)) * Math.sin(i * angle - Math.PI / 2);
    ctx.fillText(textArr[i], x, y);
  }
}

function createStatPolygon(stat) {
  ctx.beginPath();
  for (let i = 0; i <= sides; i++) {
    const x = centerX + stat[i % sides] * Math.cos(i * angle - Math.PI / 2);
    const y = centerY + stat[i % sides] * Math.sin(i * angle - Math.PI / 2);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.strokeStyle = "#ddd";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = getRandomColor();
  ctx.fill();
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  return (
    "#" +
    Array.from(
      { length: 6 },
      () => letters[Math.floor(Math.random() * letters.length)]
    ).join("")
  );
}

function changeStat() {
  const from = stats[currentNumber];
  const to = stats[1 - currentNumber];
  currentNumber = 1 - currentNumber;
  animateStatChange(from, to, 500);
}

function animateStatChange(from, to, duration = 500) {
  const startTime = performance.now();

  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const t = Math.min(elapsed / duration, 1);
    const interpolated = from.map((start, i) => start + (to[i] - start) * t);

    drawBase();
    createStatPolygon(interpolated);

    if (t < 1) requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}
