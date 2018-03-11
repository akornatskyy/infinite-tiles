import Rectangle from '../math/rectangle';

import Cache from './cache';


const makeKey = (x, y) => (y >=0 ? 'S' + y : 'N' + (-y)) +
  (x >= 0 ? 'E' + x : 'W' + (-x));

const RECT_EMPTY = new Rectangle();

export default class Storage {
  constructor(api, margin, limit) {
    console.log('storage > ctor: margin: %o, limit: %d', margin, limit);
    this.api = api;
    this.margin = margin;
    this.cache = new Cache(limit);
    this.tiles = RECT_EMPTY;
    this.fetching = new Map();
    this.ref = 0;
    this.refs = new Map();
    api.on('open', this.onopen.bind(this));
    api.on('tiles', this.ontiles.bind(this));
  }

  get(x, y) {
    const key = makeKey(x, y);
    return this.cache.peek(key);
  }

  preload(tiles) {
    if (tiles.equals(this.tiles)) {
      return;
    }

    this.tiles = tiles;
    if (!this.api.isReady()) {
      return;
    }

    const keys = [];
    const coords = [];
    const xmin = tiles.left - this.margin.width;
    const xmax = tiles.right + this.margin.width;
    const ymin = tiles.top - this.margin.height;
    const ymax = tiles.bottom + this.margin.height;
    for (let y = ymin; y <= ymax; y++) {
      for (let x = xmin; x <= xmax; x++) {
        const key = makeKey(x, y);
        if (!this.cache.touch(key) && !this.fetching.has(key)) {
          this.fetching.set(key);
          keys.push(key);
          coords.push(x - xmin);
          coords.push(y - ymin);
        }
      }
    }

    if (keys.length > 0) {
      this.refs.set(this.ref, keys);
      this.api.send({
        t: 'tiles',
        area: [xmin, ymin, xmax, ymax],
        ref: this.ref,
        coords: coords
      });

      if (this.ref < 127) {
        this.ref++;
      } else {
        this.ref = 0;
      }
    } else {
      this.api.send({
        t: 'tiles',
        area: [xmin, ymin, xmax, ymax]
      });
    }
  }

  onopen() {
    this.cache.clear();
    this.tiles = RECT_EMPTY;
    this.fetching.clear();
    this.ref = 0;
    this.refs.clear();
  }

  ontiles(p) {
    console.log('storage > ontiles: %o', p);
    const keys = this.refs.get(p.ref);
    if (!keys) {
      return;
    }

    this.refs.delete(p.ref);
    const data = p.data;
    if (keys.length !== data.length) {
      console.log('WARN: #keys <> #data');
      return;
    }

    keys.forEach((key, i) => {
      this.cache.set(key, data[i]);
      this.fetching.delete(key);
    });
  }
}
