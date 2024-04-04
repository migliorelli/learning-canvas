/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");

const undoButton = document.querySelector(".undo");
const clearButton = document.querySelector(".clear");

const colorFields = document.querySelectorAll(".color-field");
const colorPicker = document.querySelector(".color-picker");
const penRange = document.querySelector(".pen-range");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.75;
canvas.style.backgroundColor = "#222222";
canvas.style.color = "#fff";

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

let color = "red";
let lineWidth = 1;
let isDrawing = false;

let historyArray = [];
let index = -1;

/**
 * @param {MouseEvent} e
 */
const start = (e) => {
  isDrawing = true;
  const { clientX, clientY } = e;
  const { offsetLeft, offsetTop } = canvas;

  ctx.beginPath();
  ctx.moveTo(clientX - offsetLeft, clientY - offsetTop);
  e.preventDefault();
};

/**
 * @param {MouseEvent} e
 */
const draw = (e) => {
  const { clientX, clientY } = e;
  const { offsetLeft, offsetTop } = canvas;

  if (isDrawing) {
    ctx.lineTo(clientX - offsetLeft, clientY - offsetTop);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  }

  e.preventDefault();
};

/**
 * @param {MouseEvent} e
 */
const stop = (e) => {
  if (isDrawing) {
    ctx.stroke();
    ctx.closePath();
    isDrawing = false;
  }
  e.preventDefault();

  if (e.type !== "mouseout") {
    historyArray.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    index++;
  }
};

const clear = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  historyArray = [];
  index = -1;
};

canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("touchend", stop, false);

colorFields.forEach((field) =>
  field.addEventListener("click", (e) => {
    color = e.target.style.backgroundColor;
  })
);

colorPicker.addEventListener("change", (e) => {
  color = e.target.value;
});

penRange.addEventListener("change", (e) => {
  lineWidth = e.target.value;
});

undoButton.addEventListener("click", () => {
  if (index <= 0) {
    clear();
  } else {
    index--;
    historyArray.pop();
    ctx.putImageData(historyArray[index], 0, 0);
  }
});

clearButton.addEventListener("click", clear);
