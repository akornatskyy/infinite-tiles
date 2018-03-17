import EventEmitter from 'events';
import mp from 'msgpack-lite';

const host = '';

export default class WebSocketAPI {
  constructor() {
    this.eventEmitter = new EventEmitter();
    this.onclose = this.onclose.bind(this);
    this.onmessage = this.onmessage.bind(this);
    this.onopen = this.onopen.bind(this);
    this.queue = [];
  }

  connect() {
    this.ws = new WebSocket(host);
    this.ws.binaryType = 'arraybuffer';
    this.ws.onclose = this.onclose;
    this.ws.onmessage = this.onmessage;
    this.ws.onopen = this.onopen;
  }

  isReady() {
    return this.ws.readyState === 1;
  }

  on(eventName, listener) {
    this.eventEmitter.on(eventName, listener);
  }

  send(packet) {
    console.log('api > send: %o', packet);
    const message = mp.encode(packet);
    if (this.ws.readyState === 1 /* OPEN */) {
      this.ws.send(message);
    } else {
      this.queue.push(message);
    }
  }

  onopen(e) {
    this.eventEmitter.emit('open');
    if (this.queue.length > 0) {
      this.queue.forEach(p => this.ws.send(p));
      this.queue = [];
    }
  }

  onmessage(message) {
    const packet = mp.decode(new Uint8Array(message.data));
    this.eventEmitter.emit(packet.t, packet);
  }

  onclose(e) {
    this.eventEmitter.emit('close');
    setTimeout(() => this.connect(), 1500);
  }
}
