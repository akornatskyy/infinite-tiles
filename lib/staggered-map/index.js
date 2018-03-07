import Storage from './storage';
import Viewport from './viewport';
import World from './world';

export default class StaggeredMap {
  constructor(tileSize, bounds) {
    this.viewport = new Viewport(new World(tileSize), bounds);
    this.tiles = this.viewport.tiles();
    this.storage = new Storage();
  }

  update() {
    this.tiles = this.viewport.tiles();
    this.storage.preload(this.tiles);
  }
}
