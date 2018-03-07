import Rectangle from '../math/rectangle';

export default class Storage {
  constructor() {
    this.tiles = new Rectangle();
  }

  preload(tiles) {
    if (tiles.equals(this.tiles)) {
      return;
    }

    this.tiles = tiles;
  }
}
