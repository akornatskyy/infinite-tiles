import Viewport from './viewport';
import World from './world';

export default class StaggeredMap {
  constructor(tileSize, bounds, storage) {
    this.viewport = new Viewport(new World(tileSize), bounds);
    this.tiles = this.viewport.tiles();
    this.storage = storage;
  }

  update() {
    this.tiles = this.viewport.tiles();
    this.storage.preload(this.tiles);
  }
}
