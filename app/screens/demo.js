export default class DemoScreen {
  constructor(game, debug = true) {
    this.game = game;
  }

  render(delta) {
    this.update(delta);
    this.draw();
  }

  update(delta) {
  }

  draw() {
    this.game.ctx.clearRect(
      0, 0, this.game.canvas.width, this.game.canvas.height);
  }
}
