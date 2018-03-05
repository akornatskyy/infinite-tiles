import Rectangle from '../../lib/math/rectangle';
import StaggeredMap from '../../lib/staggered-map';


const TILE_SIZE = {
  width: 128,
  halfWidth: 64,
  height: 64,
  halfHeight: 32
};

const BOUNDS = new Rectangle(0, 0, TILE_SIZE.width * 3, TILE_SIZE.height * 3);

export default class DemoScreen {
  constructor(game, debug = true) {
    this.game = game;
    this.map = new StaggeredMap(TILE_SIZE, BOUNDS);
  }

  render(delta) {
    this.update(delta);
    this.draw();
  }

  update(delta) {
    this.map.update();
  }

  draw() {
    this.game.ctx.clearRect(
      0, 0, this.game.canvas.width, this.game.canvas.height);
  }
}
