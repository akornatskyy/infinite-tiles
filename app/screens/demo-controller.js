import Vector from '../../lib/math/vector';

export default class DemoController {
  constructor(screen) {
    this.screen = screen;
    this.viewport = screen.map.viewport;
    this.time = 0.0;
    this.velocity = new Vector();
    this.placeOrMove = this.placeOrMove.bind(this);

    this.api = screen.api;
    this.api.on('open', this.onopen.bind(this));
    this.api.on('close', this.onclose.bind(this));

    this.k = -0.25; // spring constant
    this.b = -0.05; // viscous damping coefficient
    this.l = 128 * 4; // spring length at rest
  }

  onopen() {
    setTimeout(() => {
      this.timer = setInterval(this.placeOrMove, 250);
    }, 2000);
  }

  onclose() {
    clearInterval(this.timer);
    this.timer = null;
  }

  update(delta) {
    if (!this.timer) {
      return;
    }

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

  placeOrMove() {
    const tiles = this.screen.map.viewport.tiles();
    const objects = this.screen.objects;
    const x = Math.floor(Math.random() * tiles.width + 1) + tiles.left;
    const y = Math.floor(Math.random() * tiles.height + 1) + tiles.top;
    if (objects.find(
        o => (!o.moving && o.tile.x === x && o.tile.y === y) ||
        (o.moving && o.target.x === x && o.target.y === y))) {
      return;
    }

    if (objects.length < tiles.width * tiles.height / 2) {
      this.api.send({
        t: 'place',
        x: x,
        y: y
      });
    } else {
      const o = objects[Math.floor(Math.random() * objects.length)];
      if (!o.moving) {
        this.api.send({
          t: 'move',
          id: o.id,
          x: x,
          y: y
        });
      }
    }
  }
}
