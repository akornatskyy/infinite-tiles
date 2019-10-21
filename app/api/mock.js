import EventEmitter from 'events';

const toxic = f => setTimeout(f, 750 + Math.random() * 500);
const newid = () => Math.random().toString(36).substring(2);

export default class MockAPI {
  constructor() {
    this.eventEmitter = new EventEmitter();
    this.ready = false;
    this.controller = new Controller(this.eventEmitter);
  }

  connect() {
    this.ready = true;
    this.eventEmitter.emit('open');
  }

  isReady() {
    return this.ready;
  }

  on(eventName, listener) {
    this.eventEmitter.on(eventName, listener);
  }

  send(p) {
    console.log('api > send: %o', p);
    switch (p.t) {
      case 'ping':
        this.controller.ping(p);
        break;
      case 'tiles':
        toxic(() => this.controller.tiles(p));
        break;
      case 'place':
        this.controller.place(p);
        break;
      case 'move':
        this.controller.move(p);
        break;
      default:
        console.warn('api > send: unknown packet [' + p.t + ']');
    }
  }
}

class Controller {
  constructor(eventEmitter) {
    this.eventEmitter = eventEmitter;
    this.objects = [];
    setTimeout(() => setInterval(this.recycle.bind(this), 1000), 5000);
  }

  ping(p) {
    this.eventEmitter.emit('pong', {
      tc: p.time,
      ts: Date.now() / 1000.0
    });
  }

  tiles(p) {
    const coords = p.coords;
    if (!coords) {
      return;
    }

    const [, ymin] = p.area;
    const data = [];
    for (let i = 1; i < coords.length; i += 2) {
      const y = ymin + coords[i];
      data.push(Math.abs(y) % 2);
    }

    this.eventEmitter.emit('tiles', {
      ref: p.ref,
      data: data
    });
  }

  place(p) {
    const id = newid();
    this.objects.push(id);
    this.eventEmitter.emit('place', {
      objects: [{
        id: id,
        x: p.x,
        y: p.y
      }]
    });
  }

  move(p) {
    const id = p.id;
    const index = this.objects.indexOf(id);
    if (index >= 0) {
      this.objects.splice(index, 1);
    }

    const ts = Date.now();
    const t = Math.floor(ts / 1000.0);
    const duration = 1 + Math.floor(Math.random() * 5);
    this.eventEmitter.emit('move', {
      objects: [{
        id: id,
        x: p.x,
        y: p.y,
        time: t + 1,
        duration: duration
      }]
    });
    setTimeout(() => {
      this.objects.push(id);
      this.eventEmitter.emit('moved', {
        id: id
      });
    },
    duration * 1000 + (ts - t * 1000));
  }

  recycle() {
    if (this.objects.length === 0) {
      return;
    }

    const n = Math.floor(Math.random() * 3);
    if (n === 0) {
      return;
    }

    this.eventEmitter.emit('remove', {
      objects: this.objects.splice(0, n)
    });
  }
}
