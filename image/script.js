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

class CanvasImage {
  /**
   *
   * @param {string} path
   * @param {number} x
   * @param {number} y
   * @param {number} w
   * @param {number} h
   */
  constructor(path, x, y, w, h) {
    this.path = path;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw(ctx) {}
}

/**
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {CanvasImage} canvasImage
 */
const createImage = (ctx, canvasImage) => {
  const imageElement = document.createElement("img");
  imageElement.src = canvasImage.path;

  imageElement.addEventListener("load", () => {
    ctx.drawImage(
      imageElement,
      canvasImage.x,
      canvasImage.y,
      canvasImage.w,
      canvasImage.h
    );
  });
};

const image = new CanvasImage("./image.jpg", 50, 50, 400, 400);
createImage(ctx, image);
