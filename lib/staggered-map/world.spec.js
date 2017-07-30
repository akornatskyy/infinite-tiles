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
});
