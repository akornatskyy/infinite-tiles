import Api from 'api';

import Assets from './assets';

const now = () => Date.now() / 1000.0;

export default class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.api = new Api();
    this.ts = 0;
    this.delta = 0;
    this.render = this.render.bind(this);
    this.ping = this.ping.bind(this);
  }

  start() {
    if (!this.screen) {
      throw new Error('screen is not set');
    }

    Assets.load(() => {
      this.api.on('open', this.onopen.bind(this));
      this.api.on('close', this.onclose.bind(this));
      this.api.on('pong', this.onpong.bind(this));
      this.api.connect();
    });
  }

  render(ts) {
    const delta = (ts - this.ts) / 1000.0;
    this.ts = ts;
    if (delta > 0.06) {
      console.warn('game > render : delta = %s', delta);
    }

    this.screen.render(delta);
    this.requestId = window.requestAnimationFrame(this.render);
  }

  onopen() {
    this.ping();
    this.timer = setInterval(this.ping, 10000);
    window.requestAnimationFrame(ts => {
      this.ts = ts;
      this.render(ts);
    });
  }

  onclose() {
    window.cancelAnimationFrame(this.requestId);
    this.requestId = null;
    clearInterval(this.timer);
    this.timer = null;
  }

  ping() {
    this.api.send({
      t: 'ping',
      time: now()
    });
  }

  onpong(p) {
    console.log('game > onpong: %o', p);
    const t = now();
    const roundtrip = t - p.tc;
    const latency = roundtrip / 2;
    const delta = p.ts - t;
    this.delta = delta + latency;

    console.log('game > latency: %sms; delta: %ss',
      (latency * 1000).toFixed(1), this.delta.toFixed(6));
  }
}
