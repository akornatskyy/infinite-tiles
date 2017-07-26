import Rectangle from '../math/rectangle';

export default class StaggeredWorld {
  constructor(tileSize) {
    this.tileSize = tileSize;
  }

  worldToScreen(x, y) {
    return {
      x: x * this.tileSize.width + (y % 2 ? this.tileSize.halfWidth : 0),
      y: y * this.tileSize.halfHeight
    }
  }
}
