export default class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  scaleAndAdd(other, scale) {
    this.x += other.x * scale;
    this.y += other.y * scale;
    return this;
  }
}
