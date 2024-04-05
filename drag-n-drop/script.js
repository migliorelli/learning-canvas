/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");

const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;
const { PI } = Math;

canvas.height = windowHeight;
canvas.width = windowWidth;
canvas.style.backgroundColor = "#222222";
canvas.style.color = "#fff";

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

let currentShapeIndex = null;
const shapes = [
  {
    x: 0,
    y: 0,
    width: 200,
    height: 200,
    color: "violet",
  },
  {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    color: "blueviolet",
  },
];

let startX;
let startY;

let isDragging = false;

const getBordersCoordinates = (shape) => {
  const left = shape.x;
  const right = shape.x + shape.width;
  const top = shape.y;
  const bottom = shape.y + shape.height;

  return {
    left,
    right,
    top,
    bottom,
  };
};

const isHovering = (x, y, shape) => {
  const coordinates = getBordersCoordinates(shape);

  return (
    x > coordinates.left &&
    x < coordinates.right &&
    y > coordinates.top &&
    y < coordinates.bottom
  );
};

let offsetX = 0;
let offsetY = 0;

const updateOffset = () => {
  const offsets = canvas.getBoundingClientRect();
  offsetX = offsets.left;
  offsetY = offsets.top;
};

window.onscroll = () => updateOffset();
window.onresize = () => updateOffset();
canvas.onscroll = () => updateOffset();

/**
 * @param {MouseEvent} e
 */
const mouseDown = (e) => {
  e.preventDefault();

  startX = parseInt(e.clientX - offsetX);
  startY = parseInt(e.clientY - offsetY);

  shapes.forEach((shape, index) => {
    if (isHovering(startX, startY, shape)) {
      currentShapeIndex = index;
      isDragging = true;
      canvas.style.cursor = "move";
      return;
    }
  });
};

/**
 * @param {MouseEvent} e
 */
const mouseUp = (e) => {
  if (isDragging) {
    e.preventDefault();
    isDragging = false;
    canvas.style.cursor = "default";
  }
};

/**
 * @param {MouseEvent} e
 */
const mouseOut = (e) => {
  if (isDragging) {
    e.preventDefault();
    isDragging = false;
    canvas.style.cursor = "default";
  }
};

/**
 * @param {MouseEvent} e
 */
const mouseMove = (e) => {
  if (isDragging) {
    const mouseX = parseInt(e.clientX - offsetX);
    const mouseY = parseInt(e.clientY - offsetY);

    let dx = mouseX - startX;
    let dy = mouseY - startY;

    const shape = shapes[currentShapeIndex];

    const x = shape.x;
    const y = shape.y;

    shape.x += dx;
    shape.y += dy;

    const coordinates = getBordersCoordinates(shape);

    if (
      coordinates.left < 0 ||
      coordinates.right > canvas.width ||
      coordinates.top < 0 ||
      coordinates.bottom > canvas.height
    ) {
      shape.x = x;
      shape.y = y;
    }

    drawShapes();

    startX = mouseX;
    startY = mouseY;
  }
};

const drawShapes = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  shapes.forEach((shape) => {
    ctx.fillStyle = shape.color;
    ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
  });
};

canvas.addEventListener("mouseup", mouseUp);
canvas.addEventListener("mousedown", mouseDown);
canvas.addEventListener("mousemove", mouseMove);
canvas.addEventListener("mouseout", mouseOut);

drawShapes();
