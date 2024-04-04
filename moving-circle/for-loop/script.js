/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");

const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;
const { PI } = Math;

canvas.height = windowHeight;
canvas.width = windowWidth;
canvas.style.backgroundColor = "#222222";
canvas.style.color = "#fff";

/**
 *
 * @param {number} min
 * @param {number} max
 */
const random = (min, max) => {
  const randomNumber = Math.random() * (max - min) + min;
  return randomNumber;
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
   * @param {number} speed
   * @param {string | undefined} text
   */
  constructor(x, y, radius, color, speed, text) {
    this.radius = radius;
    this.color = color;
    this.text = text;

    this.x = x;
    this.y = y;

    // movement
    this.speed = speed;
    this.dx = 1 * this.speed;
    this.dy = 1 * this.speed;
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

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  updatePosition(ctx) {
    this.draw(ctx);

    if (this.x + this.radius > windowWidth) {
      this.dx = -this.dx;
    }

    if (this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > windowHeight) {
      this.dy = -this.dy;
    }

    if (this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;
  }
}

/**
 *
 * @param {number} xA
 * @param {number} yA
 * @param {number} xB
 * @param {number} yB
 */
const getDistance = (xA, yA, xB, yB) => {
  const xPower = Math.pow(xB - xA, 2);
  const yPower = Math.pow(yB - yA, 2);

  const distance = Math.sqrt(xPower + yPower);
  return distance;
};

/** @type {Circle[]} */
const circles = [];

for (let index = 0; index < 20; index++) {
  const radius = 50;

  const x = random(radius, windowWidth - radius);
  const y = random(radius, windowHeight - radius);

  const circle = new Circle(x, y, radius, "#875099", 5, String(index + 1));
  circles.push(circle);
}

const updateCircles = () => {
  requestAnimationFrame(updateCircles);
  ctx.clearRect(0, 0, windowWidth, windowHeight);

  circles.forEach((el) => {
    el.updatePosition(ctx);
  });
};

updateCircles();
