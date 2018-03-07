export default class Rectangle {
  constructor(left = 0, top = 0, width = 0, height = 0) {
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
  }

  get right() {
    return this.left + this.width;
  }

  get bottom() {
    return this.top + this.height;
  }

  equals(other) {
    return this.left == other.left && this.top == other.top &&
      this.width == other.width && this.height == other.height;
  }
}
