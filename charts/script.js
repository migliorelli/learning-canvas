/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");

const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

canvas.height = windowHeight;
canvas.width = windowWidth;
canvas.style.backgroundColor = "#222222";
canvas.style.color = "#fff";

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

const data = Array.from(
  { length: 10 },
  () => Math.floor(Math.random() * (1000 - 100 + 1)) + 100
);

const distance = canvas.width / data.length;
const startPoint = 0;
const startValue = data[0];

ctx.beginPath();

ctx.moveTo(startPoint, startValue);

data.forEach((value, index) => {
  const offset = startPoint + distance * (index + 1);
  ctx.lineTo(offset, value);
});

ctx.lineTo(canvas.width, canvas.height);
ctx.lineTo(startPoint, canvas.height);
ctx.lineTo(startPoint, startValue);

ctx.lineWidth = 3;
ctx.strokeStyle = "#ccc";
ctx.stroke();

ctx.fillStyle = "#1c1b1b";
ctx.fill();

ctx.closePath();
