import EventEmitter from 'events';

const toxic = f => setTimeout(f, 750 + Math.random() * 500);
const newid = () => Math.random().toString(36).substring(2);

export default class MockAPI {
  constructor() {
    this.eventEmitter = new EventEmitter();
    this.ready = false;
    this.objects = [];
    setTimeout(() => setInterval(this.recycle.bind(this), 1000), 5000);
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
    const t = p.t;
    if (t === 'tiles') {
      const coords = p.coords;
      if (!coords) {
        return;
      }

      toxic(() => {
        const [, ymin] = p.area;
        const data = [];
        for (var i = 1; i < coords.length; i += 2) {
          const y = ymin + coords[i];
          data.push(Math.abs(y) % 2);
        }

        this.eventEmitter.emit('tiles', {
          ref: p.ref,
          data: data
        });
      });
    } else if (t === 'place') {
      toxic(() => {
        const id = newid();
        this.objects.push(id);
        this.eventEmitter.emit('place', {
          objects: [{
            id: id,
            x: p.x,
            y: p.y
          }]
        });
      });
    }
  }

  recycle() {
    if (this.objects.length === 0) {
      return;
    }

    let n = Math.floor(Math.random() * 3);
    if (n === 0) {
      return;
    }

    this.eventEmitter.emit('remove', {
      objects: this.objects.splice(0, n)
    });
  }
};
