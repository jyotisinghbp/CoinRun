const levels = require('../js/levels');

describe('levels definitions', () => {
  test('levels is an array with at least 1 level', () => {
    expect(Array.isArray(levels)).toBe(true);
    expect(levels.length).toBeGreaterThanOrEqual(1);
  });

  test('each level has maze, timer, enemies, fires, coinCount', () => {
    levels.forEach(level => {
      expect(level).toHaveProperty('maze');
      expect(level).toHaveProperty('timer');
      expect(level).toHaveProperty('enemies');
      expect(level).toHaveProperty('fires');
      expect(level).toHaveProperty('coinCount');
      expect(Array.isArray(level.maze)).toBe(true);
    });
  });

  test('maze rows are consistent lengths', () => {
    levels.forEach(level => {
      const rowLengths = level.maze.map(row => row.length);
      const first = rowLengths[0];
      rowLengths.forEach(len => expect(len).toBe(first));
    });
  });
});
