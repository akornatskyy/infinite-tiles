import Viewport from './viewport';
import World from './world';

export default class StaggeredMap {
  constructor(tileSize, bounds) {
    this.viewport = new Viewport(new World(tileSize), bounds);
    this.tiles = this.viewport.tiles();
  }

  update() {
    this.tiles = this.viewport.tiles();
  }
}
