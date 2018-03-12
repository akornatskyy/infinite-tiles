import Vector from '../../lib/math/vector';

export default class DemoController {
  constructor(viewport) {
    this.viewport = viewport;
    this.time = 0.0;
    this.velocity = new Vector();

    this.k = -0.25; // spring constant
    this.b = -0.05; // viscous damping coefficient
    this.l = 128 * 4; // spring length at rest
  }

  update(delta) {
    this.time += delta;
    if (this.time >= 3.0 /* seconds */ ) {
      this.time = 0.0;
      // apply force
      this.velocity.x += Math.random() * 101 - 50;
      this.velocity.y += Math.random() * 101 - 50;
    }

    const p = this.viewport.position;
    const x = p.x;
    const y = p.y;

    const l = Math.sqrt(x * x + y * y);
    const s = l - this.l;
    const kx = s <= 0 ? 0 : this.k * x * s / l;
    const ky = s <= 0 ? 0 : this.k * y * s / l;
    this.velocity.x += delta * (kx + this.b * this.velocity.x);
    this.velocity.y += delta * (ky + this.b * this.velocity.y);

    p.scaleAndAdd(this.velocity, delta);
  }
}
