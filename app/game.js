import Api from 'api';

import Assets from './assets';

export default class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.api = new Api();
    this.ts = 0;
    this.render = this.render.bind(this);
  }

  start() {
    if (!this.screen) {
      throw new Error('screen is not set');
    }

    Assets.load(() => {
      this.api.connect();
      window.requestAnimationFrame(ts => {
        this.ts = ts;
        this.render(ts);
      });
    });
  }

  render(ts) {
    const delta = (ts - this.ts) / 1000.0;
    this.ts = ts;
    this.screen.render(Math.min(delta, 0.06));
    window.requestAnimationFrame(this.render);
  }
}
