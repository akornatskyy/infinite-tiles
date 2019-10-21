import Rectangle from '../math/rectangle';

export default class StaggeredWorld {
  constructor(tileSize) {
    this.tileSize = tileSize;
  }

  worldToScreen(x, y) {
    return {
      x: x * this.tileSize.width + (y % 2 ? this.tileSize.halfWidth : 0),
      y: y * this.tileSize.halfHeight
    };
  }

  /*
    Translates from screen coordinates to
    cortesian coordinates.

                           ^ y
                           |
                           |
    +---+---+---->     +---+---+
    |oa/|\ob|   x      |oc/|\od|
    | / | \ |          | / | \ |
    |/ia|ib\|          |/ic|id\|
    +---+---+          +---+---+---->
    |\ic|id/|          |\ia|ib/|   x
    | \ | / |          | \ | / |
    |oc\|/od|          |oa\|/ob|
    +---+---+          +---+---+
    |
    | y
    v

  */
  screenToWorld(x, y) {
    x = Math.round(x);
    y = Math.round(y) + 1; // adjust for rendering overlap.

    let tx = Math.floor(x / this.tileSize.width);
    let ty = Math.floor(y / this.tileSize.height) * 2;

    x = Math.floor(x % this.tileSize.width);
    x += x < 0 ? this.tileSize.halfWidth : -this.tileSize.halfWidth;

    y = Math.floor(y % this.tileSize.height);
    y += y < 0 ? this.tileSize.halfHeight : -this.tileSize.halfHeight;

    // console.log(tx, ty, x, y);
    if (x < 0) {
      if (y < 0) {
        // case `oa`
        if (-2 * (y + this.tileSize.halfHeight) > x) {
          tx--;
          ty--;
        }
      } else {
        // case `oc`
        if (2 * (y - this.tileSize.halfHeight) > x) {
          tx--;
          ty++;
        }
      }
    } else {
      if (y < 0) {
        // case `ob`
        if (2 * (y + this.tileSize.halfHeight) <= x) {
          ty--;
        }
      } else {
        // case `od`
        if (-2 * (y - this.tileSize.halfHeight) <= x) {
          ty++;
        }
      }
    }

    return {
      x: tx,
      y: ty
    };
  }

  screenToWorldRectangle(screen) {
    const lt = this.screenToWorldLeftTop(
        screen.left, screen.top);
    const rb = this.screenToWorldRightBottom(
        screen.right, screen.bottom);
    return new Rectangle(lt.x, lt.y, rb.x - lt.x, rb.y - lt.y);
  }

  screenToWorldLeftTop(x, y) {
    // console.log(x, y);
    let tx = Math.floor(x / this.tileSize.width);
    let ty = Math.floor(y / this.tileSize.height) * 2;

    x %= this.tileSize.width;
    x += (x < 0 ? this.tileSize.halfWidth : -this.tileSize.halfWidth);

    y %= this.tileSize.height;
    y += (y < 0 ? this.tileSize.halfHeight : -this.tileSize.halfHeight);

    // console.log(tx, ty, x, y);
    if (x < 0) {
      if (y < 0) {
        // case `a`
        tx--;
        ty--;
      } else {
        // case `c`
        tx--;
      }
    } else {
      if (y < 0) {
        // case `b`
        ty--;
      }
    }

    return {
      x: tx,
      y: ty
    };
  }

  screenToWorldRightBottom(x, y) {
    let tx = Math.floor(x / this.tileSize.width);
    let ty = Math.floor(y / this.tileSize.height) * 2;

    x %= this.tileSize.width;
    if (x == 0) {
      tx--;
    }

    y %= this.tileSize.height;
    if (y == 0) {
      ty--;
    } else {
      y += (y < 0 ? this.tileSize.halfHeight : -this.tileSize.halfHeight);
      if (y > 0) {
        // case `d`
        ty++;
      }
    }
    return {
      x: tx,
      y: ty
    };
  }
}
