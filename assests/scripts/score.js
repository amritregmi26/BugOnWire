export default class Score {
  constructor(canvas, wires, ctx) {
    this.canvas = canvas;
    this.wires = wires;
    this.ctx = ctx;
    this.startTime = performance.now();
  }

  updateScore() {
    let currentTime = performance.now();
    let elapsedTime = currentTime - this.startTime;

    let seconds = Math.floor((elapsedTime % (60 * 1000)) / 1000);

    return seconds;

  }

  drawScore() {
    this.ctx.fillStyle = 'black';
    this.ctx.font = '24px Arial';
    this.ctx.fillText("Score: " + this.updateScore(), 10, 30);
  }
}