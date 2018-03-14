import EventEmitter from 'events';


const toxic = f => setTimeout(f, 750 + Math.random() * 500);

export default class MockAPI {
  constructor() {
    this.eventEmitter = new EventEmitter();
    this.ready = false;
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
    }
  }
};
