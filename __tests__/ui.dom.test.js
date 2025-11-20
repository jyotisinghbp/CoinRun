/**
 * UI integration tests: presence of buttons and overlay behavior
 */

beforeEach(() => {
  // reset DOM
  document.body.innerHTML = '';

  // create minimal DOM elements required by game.js
  const header = document.createElement('header');
  header.className = 'app-header';
  header.innerHTML = '<h1>Maze Runner</h1>';
  document.body.appendChild(header);

  const topBar = document.createElement('div');
  topBar.className = 'top-bar';
  topBar.innerHTML = '<div class="info"><div id="timer">Time: 60</div><div id="level">Level: 1</div></div><div class="score"><div id="score">Score: 0</div></div>';
  document.body.appendChild(topBar);

  const controls = document.createElement('div');
  controls.className = 'controls-bar';
  controls.innerHTML = '<button id="startBtn">Start</button><button id="restartBtn">Restart</button>';
  document.body.appendChild(controls);

  const mazeContainer = document.createElement('div');
  mazeContainer.className = 'maze-container';
  const canvas = document.createElement('canvas');
  canvas.id = 'gameCanvas';
  canvas.width = 600; canvas.height = 400;
  mazeContainer.appendChild(canvas);
  document.body.appendChild(mazeContainer);

  const overlay = document.createElement('div');
  overlay.id = 'overlay';
  overlay.style.display = 'none';
  overlay.innerHTML = '<div id="overlay-message"></div><button id="nextBtn">Next Level</button><button id="retryBtn">Retry</button>';
  document.body.appendChild(overlay);

  // Stub global functions that game.js expects
  global.setupMaze = jest.fn();
  global.setupPlayer = jest.fn();
  global.setupCoins = jest.fn();
  global.updateLevel = jest.fn();
  global.updateTimer = jest.fn();
  global.updateUI = jest.fn();
  global.drawGame = jest.fn();

  // provide a simple levels array
  global.levels = require('../js/levels');
});

afterEach(() => {
  // clear module cache to allow re-require with fresh state
  jest.resetModules();
});

test('buttons and overlay elements present', () => {
  const game = require('../js/game');
  expect(document.getElementById('startBtn')).not.toBeNull();
  expect(document.getElementById('restartBtn')).not.toBeNull();
  expect(document.getElementById('overlay')).not.toBeNull();
  expect(document.getElementById('overlay-message')).not.toBeNull();
  expect(document.getElementById('nextBtn')).not.toBeNull();
  expect(document.getElementById('retryBtn')).not.toBeNull();
});

test('winning shows Next Level button', () => {
  const game = require('../js/game');
  // simulate win
  game.levelComplete();
  const overlay = document.getElementById('overlay');
  const nextBtn = document.getElementById('nextBtn');
  const retryBtn = document.getElementById('retryBtn');
  const msg = document.getElementById('overlay-message').textContent;

  expect(overlay.style.display).toBe('flex');
  expect(nextBtn.style.display).toBe('inline-block');
  expect(retryBtn.style.display).toBe('inline-block');
  expect(msg.length).toBeGreaterThan(0);
});

test('losing by enemy shows no Next Level', () => {
  const game = require('../js/game');
  game.showOverlay('You were caught by an enemy!', false);
  const overlay = document.getElementById('overlay');
  const nextBtn = document.getElementById('nextBtn');
  const retryBtn = document.getElementById('retryBtn');
  const msg = document.getElementById('overlay-message').textContent;

  expect(overlay.style.display).toBe('flex');
  expect(nextBtn.style.display).toBe('none');
  expect(retryBtn.style.display).toBe('inline-block');
  expect(msg).toContain('caught');
});

test('losing by fire shows burn message', () => {
  const game = require('../js/game');
  game.showOverlay('You got burned!', false);
  const msg = document.getElementById('overlay-message').textContent;
  expect(msg).toContain('burn');
});

test('clicking restart triggers level 1 load', () => {
  const game = require('../js/game');
  // click restart button
  const restartBtn = document.getElementById('restartBtn');
  restartBtn.click();
  // updateLevel should have been called with level 1 (in loadLevel)
  expect(global.updateLevel).toHaveBeenCalled();
  // the first argument called should be level (1)
  expect(global.updateLevel.mock.calls[0][0]).toBe(1);
});
