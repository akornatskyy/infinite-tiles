import Vector from '../../lib/math/vector';

class Spring {
  constructor(options) {
    this.pos = options.pos;
    this.k = options.k; // spring constant
    this.b = options.b; // viscous damping coefficient
    this.l = options.l; // spring length at rest
    this.velocity = new Vector();
  }

  update(delta) {
    const x = this.pos.x;
    const y = this.pos.y;
    const l = Math.sqrt(x * x + y * y);
    const s = l - this.l;
    let kx = 0;
    let ky = 0;
    if (s > 0) {
      const k = this.k * s / l;
      kx = k * x;
      ky = k * y;
    }

    this.velocity.x += delta * (kx + this.b * this.velocity.x);
    this.velocity.y += delta * (ky + this.b * this.velocity.y);

    this.pos.scaleAndAdd(this.velocity, delta);
  }
}

export default class DemoController {
  constructor(screen) {
    this.screen = screen;
    this.viewport = screen.map.viewport;
    this.time = 0.0;
    this.placeOrMove = this.placeOrMove.bind(this);

    this.api = screen.api;
    this.api.on('open', this.onopen.bind(this));
    this.api.on('close', this.onclose.bind(this));

    this.spring = new Spring({
      pos: this.viewport.position,
      k: -0.25,
      b: -0.05,
      l: 128 * 4
    });
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
      this.spring.velocity.x += Math.random() * 101 - 50;
      this.spring.velocity.y += Math.random() * 101 - 50;
    }

    this.spring.update(delta);
  }

  placeOrMove() {
    const tiles = this.screen.map.tiles;
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
