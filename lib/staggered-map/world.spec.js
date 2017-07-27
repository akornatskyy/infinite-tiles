import Rectangle from '../math/rectangle';
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
});
