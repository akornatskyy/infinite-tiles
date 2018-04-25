import Vector from '../math/vector';

export const MoverMixin = (superclass) => class extends superclass {

  moveTo(tile, duration, elapsed = 0.0) {
    this.target = tile;
    this.duration = duration;
    this.elapsed = elapsed;
    this.moving = true;
    this.targetPosition = new Vector(this.bounds.left, this.bounds.top)
      .add(this.viewport.worldToScreen(tile.x, tile.y))
      .sub(this.viewport.worldToScreen(this.tile.x, this.tile.y));
  }

  update(delta) {
    if (super.update) {
      super.update(delta);
    }

    if (!this.moving) {
      return;
    }

    this.position.x = this.bounds.left;
    this.position.y = this.bounds.top;
    this.elapsed += delta;
    const progress = this.elapsed / this.duration;
    if (progress < 1.0) {
      this.position.lerp(this.targetPosition, progress);
    } else {
      this.tile = this.target;
      this.targetPosition = null;
      this.target = null;
      this.moving = false;
    }
  }
};
