import Vector from '../math/vector';

export default class StaggeredMapViewport {
  constructor(world, bounds) {
    this.world = world;
    this.bounds = bounds;
    this.position = new Vector();
  }

  screenToWorld(x, y) {
    return this.world.screenToWorld(
      x - this.bounds.left + this.position.x,
      y - this.bounds.top + this.position.y);
  }

  worldToScreen(x, y) {
    const p = this.world.worldToScreen(x, y);
    return {
      x: p.x + this.bounds.left - this.position.x,
      y: p.y + this.bounds.top - this.position.y
    };
  }
}
