import Rectangle from '../math/rectangle';


const RECT_EMPTY = new Rectangle();

export default class Storage {
  constructor() {
    this.tiles = RECT_EMPTY;
  }

  get(x, y) {
    return Math.abs(y) % 2;
  }

  preload(tiles) {
    if (tiles.equals(this.tiles)) {
      return;
    }

    this.tiles = tiles;
  }
}
