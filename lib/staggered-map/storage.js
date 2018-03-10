import Rectangle from '../math/rectangle';


const makeKey = (x, y) => (y >=0 ? 'S' + y : 'N' + (-y)) +
  (x >= 0 ? 'E' + x : 'W' + (-x));

const RECT_EMPTY = new Rectangle();

export default class Storage {
  constructor(api) {
    this.api = api;
    this.tiles = RECT_EMPTY;
    this.fetching = new Map();
    this.ref = 0;
    this.refs = new Map();
    api.on('open', this.onopen.bind(this));
    api.on('tiles', this.ontiles.bind(this));
  }

  get(x, y) {
    return Math.abs(y) % 2;
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
    const xmin = tiles.left;
    const xmax = tiles.right;
    const ymin = tiles.top;
    const ymax = tiles.bottom;
    for (let y = ymin; y <= ymax; y++) {
      for (let x = xmin; x <= xmax; x++) {
        const key = makeKey(x, y);
        if (!this.fetching.has(key)) {
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

    keys.forEach(key => {
      this.fetching.delete(key);
    });
  }
}
