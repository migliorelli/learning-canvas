/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");

const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;
const { PI } = Math;

canvas.height = windowHeight;
canvas.width = windowWidth;
canvas.style.backgroundColor = "#222222";
canvas.style.color = "#fff";

const randomColor = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return "#" + n.slice(0, 6);
};

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

// circle class
class Circle {
  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} radius
   * @param {string} color
   */
  constructor(x, y, radius, color, text) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.beginPath();

    ctx.fillStyle = this.color;

    // creating the circle
    ctx.arc(this.x, this.y, this.radius, 0, PI * 2, false);
    ctx.stroke();
    ctx.fill();

    ctx.closePath();
  }

  /**
   *
   * @param {number} mousex
   * @param {number} mousey
   * @param {CanvasRenderingContext2D} ctx
   */
  click(mousex, mousey, ctx) {
    const distance = Math.sqrt(
      (mousex - this.x) * (mousex - this.x) +
        (mousey - this.y) * (mousey - this.y)
    );

    ctx.clearRect(0, 0, windowWidth, windowHeight);
    this.color = distance < this.radius ? randomColor() : "red";
    this.draw(ctx);
  }
}

const circle = new Circle(200, 200, 100, "blueviolet");
circle.draw(ctx);

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  circle.click(x, y, ctx);
});
