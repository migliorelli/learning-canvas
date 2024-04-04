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

// color
ctx.fillStyle = "#1c1b1b";

// rectangle
ctx.fillRect(0, 0, 200, 200);

// circle
ctx.beginPath();
ctx.arc(100, 315, 100, 0, PI * 2, false);

// circle stroke
ctx.strokeStyle = "#111";
ctx.lineWidth = 15;
ctx.stroke();

ctx.closePath();

// circle class
class Circle {
  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} radius
   * @param {string} color
   * @param {string | undefined} text
   */
  constructor(x, y, radius, color, text) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.text = text;
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;

    // creating the circle
    ctx.arc(this.x, this.y, this.radius, 0, PI * 2, false);
    ctx.lineWidth = 15;
    ctx.stroke();

    // putting text inside circle
    if (this.text) {
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "20px Arial";
      ctx.fillText(this.text, this.x, this.y);
    }

    ctx.closePath();
  }
}

// using circle class
const circle = new Circle(315, 100, 90, "#ebb");
circle.draw(ctx);

// random circles with circle class
for (let index = 0; index < 10; index++) {
  const x = Math.random() * windowWidth;
  const y = Math.random() * windowHeight;
  const circle = new Circle(
    x,
    y,
    50,
    "#875099",
    `X: ${x.toFixed(2)} ; Y: ${y.toFixed(2)}`
  );

  circle.draw(ctx);
}
