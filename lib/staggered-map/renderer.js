import Vector from '../math/vector';

export class StaggeredTileRenderer {
  constructor(viewport, tile, bounds) {
    this.viewport = viewport;
    this.tile = tile;
    this.bounds = bounds;
    this.position = new Vector(this.bounds.left, this.bounds.top);
  }

  draw() {
    const s = this.viewport.worldToScreen(this.tile.x, this.tile.y);
    this.drawTile(s.x + this.position.x, s.y + this.position.y);
  }
}

export class StaggeredMapRenderer {
  constructor(map, renderer) {
    this.map = map;
    this.tileSize = map.viewport.world.tileSize;
    this.bounds = map.viewport.bounds;
    this.renderer = renderer;
  }

  draw() {
    this.renderer.begin();

    const position = this.map.viewport.position;
    const tiles = this.map.tiles;
    for (let ty = tiles.top; ty <= tiles.bottom; ty++) {
      const shift = ty % 2 ? this.tileSize.halfWidth : 0;
      for (let tx = tiles.left; tx <= tiles.right; tx++) {
        let x = tx * this.tileSize.width + shift - position.x;
        if (x + this.tileSize.width <= 0 || x >= this.bounds.width) {
          continue;
        }

        let y = ty * this.tileSize.halfHeight - position.y;

        x += this.bounds.left;
        y += this.bounds.top;

        this.renderer.drawTile(tx, ty, x, y);
      }
    }

    const t = this.map.selected;
    if (t) {
      const s = this.map.viewport.worldToScreen(t.x, t.y);
      this.renderer.drawSelected(t.x, t.y, s.x, s.y);
    }

    this.renderer.end();
  }
}
