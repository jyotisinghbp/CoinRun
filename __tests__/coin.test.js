// Tests for coin placement

beforeEach(() => {
  // Set up globals expected by coin.js
  global.rows = 4;
  global.cols = 4;
  global.maze = [
    [0,1,0,0],
    [0,0,0,1],
    [1,0,0,0],
    [0,0,1,0]
  ];
  global.player = { x: 0, y: 0 };
  global.enemies = [];
  global.fires = [];
  // Provide minimal canvas context globals used by draw functions (not needed for these tests but coin.js references tileWidth/tileHeight only at draw time)
  global.tileWidth = 32;
  global.tileHeight = 32;
});

test('getReachableTiles finds reachable tiles from start', () => {
  const coinModule = require('../js/coin');
  const reachable = coinModule.getReachableTiles(global.player.x, global.player.y);
  // reachable should include start and other connected tiles
  expect(Array.isArray(reachable)).toBe(true);
  expect(reachable.length).toBeGreaterThan(1);
  // ensure no unreachable wall tiles (value 1) are included
  reachable.forEach(([x,y]) => {
    expect(global.maze[y][x]).toBe(0);
  });
});

test('setupCoins places coins only on reachable tiles and avoids enemies/fires', () => {
  const coinModule = require('../js/coin');
  // mark an enemy on one reachable tile to ensure it's avoided
  global.enemies.push({ x: 1, y: 1 });
  // a fire path
  global.fires.push({ path: [{ x: 2, y: 1 }] });

  // ensure coin array cleared
  coinModule.coins.length = 0;

  coinModule.setupCoins(3);
  expect(coinModule.coins.length).toBeLessThanOrEqual(3);
  coinModule.coins.forEach(c => {
    // tile must be path
    expect(global.maze[c.y][c.x]).toBe(0);
    // not on enemy
    expect(global.enemies.some(e => e.x === c.x && e.y === c.y)).toBe(false);
    // not on fire
    expect(global.fires.some(f => f.path.some(p => p.x === c.x && p.y === c.y))).toBe(false);
  });
});
