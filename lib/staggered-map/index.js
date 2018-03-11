import Storage from './storage';
import Viewport from './viewport';
import World from './world';

export default class StaggeredMap {
  constructor(api, tileSize, bounds) {
    this.viewport = new Viewport(new World(tileSize), bounds);
    this.tiles = this.viewport.tiles();
    console.log('staggered map > ctor: tiles: %o', this.tiles);
    const margin = {
      width: Math.ceil(this.tiles.width * 1.2),
      height: Math.ceil(this.tiles.height * 1.2)
    };
    const limit = Math.ceil(margin.width * margin.height * 16);
    this.storage = new Storage(api, margin, limit);
  }

  update() {
    this.tiles = this.viewport.tiles();
    this.storage.preload(this.tiles);
  }
}
