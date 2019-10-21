import Assets from '../assets';

export default class MapRenderer {
  constructor(ctx, storage, tileSize, bounds, debug) {
    this.ctx = ctx;
    this.storage = storage;
    this.tileSize = tileSize;
    this.bounds = bounds;
    this.debug = debug;
    if (debug) {
      this.ctx.font = '12px monospace';
      this.ctx.fillStyle = 'white';
      this.ctx.textAlign = 'center';
    }
  }

  begin() {}

  drawTile(tx, ty, x, y) {
    const index = this.storage.get(tx, ty);
    if (index === null) {
      console.log('map renderer > draw tile: (%s:%s) is missing', tx, ty);
      return;
    }

    this.ctx.drawImage(
        Assets.tiles,
        this.tileSize.width * index, 0,
        this.tileSize.width, this.tileSize.height,
        x, y, this.tileSize.width, this.tileSize.height);

    if (this.debug) {
      this.ctx.fillText(
          tx + ':' + ty,
          x + this.tileSize.halfWidth,
          y + this.tileSize.halfHeight + 3);
    }
  }

  drawSelected(tx, ty, x, y) {}

  end() {
    if (this.debug) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = 'red';
      this.ctx.rect(
          this.bounds.left, this.bounds.top,
          this.bounds.width, this.bounds.height);
      this.ctx.stroke();
    }
  }
}
