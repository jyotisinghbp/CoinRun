const { makeEnemies, makeFires } = require('../js/levelUtils');

const sampleCfg = {
  enemies: [
    { x: 1, y: 1, path: [{ x: 1, y: 1 }, { x: 1, y: 2 }] }
  ],
  fires: [
    { path: [{ x: 2, y: 2 }, { x: 3, y: 2 }], idx: 0, direction: 1 }
  ]
};

test('makeEnemies creates runtime enemy objects', () => {
  const enemies = makeEnemies(sampleCfg);
  expect(Array.isArray(enemies)).toBe(true);
  expect(enemies.length).toBe(1);
  const e = enemies[0];
  expect(e).toHaveProperty('x', 1);
  expect(e).toHaveProperty('y', 1);
  expect(e).toHaveProperty('path');
  expect(e.path).not.toBe(sampleCfg.enemies[0].path); // cloned
});

test('makeFires creates runtime fire objects', () => {
  const fires = makeFires(sampleCfg);
  expect(Array.isArray(fires)).toBe(true);
  expect(fires.length).toBe(1);
  const f = fires[0];
  expect(f).toHaveProperty('path');
  expect(f).toHaveProperty('idx', 0);
  expect(f).toHaveProperty('direction', 1);
});
