export default class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  add(other) {
    this.x += other.x;
    this.y += other.y;
    return this;
  }

  sub(other) {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  }

  scaleAndAdd(other, scale) {
    this.x += other.x * scale;
    this.y += other.y * scale;
    return this;
  }

  lerp(target, progress) {
    this.x = this.x + (target.x - this.x) * progress;
    this.y = this.y + (target.y - this.y) * progress;
    return this;
  }
}
