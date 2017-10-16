import PNG from 'png-js';

import World from './world';

describe('staggered map / world', () => {
  const TILE_SIZE = {
    width: 128,
    halfWidth: 64,
    height: 64,
    halfHeight: 32
  };
  const world = new World(TILE_SIZE);

  it('world to screen', () => {
    [
      [0, 0, 0, 0],
      [1, 0, 128, 0],
      [0, 1, 64, 32],
      [0, 2, 0, 64],
      [1, 1, 192, 32],
      [1, 2, 128, 64],
      [-1, 0, -128, 0],
      [0, -1, 64, -32],
      [-1, -1, -64, -32]
    ].forEach(([tx, ty, sx, sy]) => {
      expect(world.worldToScreen(tx, ty)).toEqual({
        x: sx,
        y: sy
      });
    });
  });

  it('screen to world', () => {
    [
      [-1, 0, -1, -1],
      [0, -2, -1, -1],
      // inner cases
      [48, 16, 0, 0],
      [80, 16, 0, 0],
      [80, 48, 0, 0],
      [48, 48, 0, 0],
      // outer cases
      [0, 0, -1, -1],
      [96, 15, 0, -1],
      [96, 48, 0, 1],
      [32, 48, -1, 1],
    ].forEach(([sx, sy, tx, ty]) => {
      expect(world.screenToWorld(sx, sy)).toEqual({
        x: tx,
        y: ty
      });
    });
  });

  it('screen to world from sample', done => {
    function checkCornerCase(x, y) {
      if (((y + 1) % TILE_SIZE.halfHeight) == 0) {
        if (Math.floor((y + 1) / TILE_SIZE.halfHeight) % 2) {
          return x % TILE_SIZE.width != 0;
        } else {
          return (x + TILE_SIZE.halfWidth) % TILE_SIZE.width != 0;
        }
      }

      return true;
    }

    function testCase(pixels, width, xstart, ystart) {
      let lp = pixels[0];
      let lt = null;
      for (let i = 0; i < pixels.length; i += 4) {
        const p = pixels[i];
        const x = ((i / 4) % width) + xstart;
        const y = Math.floor(i / 4 / width) + ystart;
        const t = world.screenToWorld(x, y);

        if (lp == p && x != xstart && checkCornerCase(x, y)) {
          expect(t).toEqual(lt);
        } else {
          expect(t).not.toEqual(lt);
        }

        lp = p;
        lt = t;
      }
    }

    const sample = PNG.load('./static/sample.png');
    sample.decodePixels(pixels => {
      testCase(pixels, sample.width, -sample.width / 2, -sample.height / 2);
      done();
    });
  });
});
