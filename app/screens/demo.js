import Rectangle from '../../lib/math/rectangle';
import StaggeredMap from '../../lib/staggered-map';
import Storage from '../../lib/staggered-map/storage';
import {
  StaggeredMapRenderer
} from '../../lib/staggered-map/renderer';

import MapRenderer from './map-renderer';


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
    game.canvas.width = BOUNDS.width;
    game.canvas.height = BOUNDS.height;
    if (debug) {
      BOUNDS.left = TILE_SIZE.width + 10;
      BOUNDS.top = TILE_SIZE.height;
      game.canvas.width += BOUNDS.left * 2;
      game.canvas.height += BOUNDS.top * 2;
    }

    const storage = new Storage(this.game.api);
    this.map = new StaggeredMap(TILE_SIZE, BOUNDS, storage);
    this.mapRenderer = new StaggeredMapRenderer(
      this.map,
      new MapRenderer(game.ctx, storage, TILE_SIZE, BOUNDS, debug));
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
    this.mapRenderer.draw();
  }
}
