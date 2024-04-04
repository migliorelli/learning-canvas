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

// circle class
class Circle {
  /**
   *
   * @param {number | boolean} x
   * @param {number | boolean} y
   * @param {number} radius
   * @param {string} color
   * @param {number} speed
   * @param {string | undefined} text
   */
  constructor(x, y, radius, color, speed, text) {
    if (x) {
      this.x = x;
    } else {
      const randomX = Math.random() * windowWidth;
      this.x = randomX;
    }

    if (y) {
      this.y = y;
    } else {
      const randomY = Math.random() * windowHeight;
      this.y = randomY;
    }

    this.radius = radius;
    this.color = color;
    this.text = text;

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

const circleA = new Circle(false, false, 50, "#875099", 5, "A");
circleA.draw(ctx);

const circleB = new Circle(false, false, 100, "#875099", 5, "B");
circleB.draw(ctx);

const updateCircles = () => {
  requestAnimationFrame(updateCircles);
  ctx.clearRect(0, 0, windowWidth, windowHeight);

  circleA.updatePosition(ctx);
  circleB.updatePosition(ctx);

  const distance = getDistance(circleA.x, circleA.y, circleB.x, circleB.y);

  if (distance < circleB.radius + circleA.radius) {
    circleB.color = "#fbf";
  } else {
    circleB.color = "#875099";
  }
};

updateCircles();
