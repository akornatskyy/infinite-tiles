import Rectangle from '../../lib/math/rectangle';
import StaggeredMap from '../../lib/staggered-map';
import {
  StaggeredMapRenderer
} from '../../lib/staggered-map/renderer';

import Sphere from '../assets/sphere';
import DemoController from './demo-controller';
import MapRenderer from './map-renderer';


const TILE_SIZE = {
  width: 128,
  halfWidth: 64,
  height: 64,
  halfHeight: 32
};

const BOUNDS = new Rectangle(0, 0, TILE_SIZE.width * 3, TILE_SIZE.height * 3);

export default class DemoScreen {
  constructor(game, debug = true) {
    this.game = game;
    game.canvas.width = BOUNDS.width;
    game.canvas.height = BOUNDS.height;
    if (debug) {
      BOUNDS.left = TILE_SIZE.width + 10;
      BOUNDS.top = TILE_SIZE.height;
      game.canvas.width += BOUNDS.left * 2;
      game.canvas.height += BOUNDS.top * 2;
    }

    this.objects = [];
    this.sphere = null;

    this.api = game.api;
    this.api.on('open', this.onopen.bind(this));
    this.api.on('place', this.onplace.bind(this));
    this.api.on('remove', this.onremove.bind(this));
    this.api.on('move', this.onmove.bind(this));
    this.api.on('moved', this.onmoved.bind(this));
    this.api.on('errors', this.onerrors.bind(this));

    this.map = new StaggeredMap(game.api, TILE_SIZE, BOUNDS);
    this.mapRenderer = new StaggeredMapRenderer(
      this.map,
      new MapRenderer(game.ctx, this.map.storage, TILE_SIZE, BOUNDS, debug));

    this.controller = new DemoController(this);
  }

  render(delta) {
    this.update(delta);
    this.draw();
  }

  update(delta) {
    this.controller.update(delta);
    this.map.update();
    this.objects.forEach(o => o.update(delta));
  }

  draw() {
    this.game.ctx.clearRect(
      0, 0, this.game.canvas.width, this.game.canvas.height);
    this.mapRenderer.draw();
    this.objects.forEach(o => o.draw());
  }

  /* API callbacks */

  onopen() {
    this.objects = [];
  }

  onerrors(p) {
    console.warn('demo > onerrors: %o', p.errors);
  }

  onplace(p) {
    console.log('demo > onplace: %o', p);
    p.objects.forEach(o => {
      const id = o.id;
      const index = this.objects.findIndex(o => o.id === id);
      if (index >= 0) {
        const sphere = this.objects[index];
        sphere.tile.x = o.x;
        sphere.tile.y = o.y;
      } else {
        const sphere = new Sphere(this.game.ctx, this.map.viewport, {
          x: o.x,
          y: o.y
        });
        sphere.id = o.id;
        this.objects.unshift(sphere);
      }
    });
  }

  onremove(p) {
    console.log('demo > onremove: %o', p);
    p.objects.forEach(id => {
      const index = this.objects.findIndex(o => o.id === id);
      if (index >= 0) {
        const sphere = this.objects.splice(index, 1)[0];
        if (this.sphere === sphere) {
          this.sphere = null;
        }
      }
    });
  }

  onmove(p) {
    console.log('demo > onmove: %o', p);
    const ts = Date.now() / 1000.0;
    p.objects.forEach(o => {
      const id = o.id;
      const index = this.objects.findIndex(o => o.id === id);
      if (index >= 0) {
        const sphere = this.objects.splice(index, 1)[0];
        this.objects.push(sphere);
        const elapsed = ts - o.time;
        sphere.moveTo({
          x: o.x,
          y: o.y
        }, o.duration, elapsed);
      }
    });
  }

  onmoved(p) {
    console.log('demo > onmoved: %o', p);
    const id = p.id;
    const index = this.objects.findIndex(o => o.id === id);
    if (index >= 0) {
      const sphere = this.objects.splice(index, 1)[0];
      this.objects.unshift(sphere);
      if (this.sphere === sphere) {
        this.sphere = null;
      }
    }
  }
}
