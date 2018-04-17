import Rectangle from '../../lib/math/rectangle';

import {StaggeredTileRenderer} from '../../lib/staggered-map/renderer';
import {MoverMixin} from '../../lib/staggered-map/mixins';

import Assets from '../assets';

export default class Sphere extends MoverMixin(StaggeredTileRenderer) {
  constructor(ctx, viewport, tile) {
    super(viewport, tile, new Rectangle(
      (viewport.world.tileSize.width - Assets.sphere.width) / 2,
      (viewport.world.tileSize.height - Assets.sphere.height) / 2,
      Assets.sphere.width, Assets.sphere.height));
    this.ctx = ctx;
  }

  drawTile(x, y) {
    if (this.moving) {
      this.ctx.drawImage(Assets.sphere, x, y);
    } else {
      const alpha = this.ctx.globalAlpha;
      this.ctx.globalAlpha = 0.9;
      this.ctx.drawImage(Assets.sphere, x, y);
      this.ctx.globalAlpha = alpha;
    }
  }
}
