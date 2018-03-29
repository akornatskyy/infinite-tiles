import Rectangle from '../../lib/math/rectangle';

import {StaggeredTileRenderer} from '../../lib/staggered-map/renderer';

import Assets from '../assets';

export default class Sphere extends StaggeredTileRenderer {
  constructor(ctx, viewport, tile) {
    super(viewport, tile, new Rectangle(
      (viewport.world.tileSize.width - Assets.sphere.width) / 2,
      (viewport.world.tileSize.height - Assets.sphere.height) / 2,
      Assets.sphere.width, Assets.sphere.height));
    this.ctx = ctx;
  }

  drawTile(x, y) {
    this.ctx.drawImage(Assets.sphere, x, y);
  }
}
