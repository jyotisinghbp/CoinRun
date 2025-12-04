/**
 * @jest-environment jsdom
 */

describe('Game Logic', () => {
    let game;

    beforeEach(() => {
        // Reset modules to ensure game.js re-runs with new DOM
        jest.resetModules();

        document.body.innerHTML = `
            <div id="overlay" style="display:none">
                <div id="overlay-message"></div>
                <button id="nextBtn">Next</button>
                <button id="retryBtn">Retry</button>
            </div>
            <button id="startBtn">Start</button>
            <button id="restartBtn">Restart</button>
            <div id="score">Score: 0</div>
            <div id="timer">Time: 60</div>
            <div id="level">Level: 1</div>
            <canvas id="gameCanvas"></canvas>
        `;

        // Mock globals
        global.levels = [{ maze: [] }, { maze: [] }];
        global.setupMaze = jest.fn();
        global.setupPlayer = jest.fn();
        global.setupCoins = jest.fn();
        global.updateLevel = jest.fn();
        global.updateTimer = jest.fn();
        global.updateUI = jest.fn();
        global.drawGame = jest.fn();
        global.checkCollisions = jest.fn();
        global.updateEnemies = jest.fn();
        global.updateFires = jest.fn();
        
        // Mock canvas context
        const canvas = document.getElementById('gameCanvas');
        canvas.getContext = jest.fn(() => ({
            clearRect: jest.fn(),
            drawImage: jest.fn(),
            fillRect: jest.fn()
        }));

        // Require game.js AFTER DOM is ready
        game = require('../js/game');
    });

    test('initGame resets score and level', () => {
        game.initGame(false);
        // We can't easily check internal state without getters, 
        // but we can check if loadLevel was called (via side effects like setupMaze)
        expect(global.setupMaze).toHaveBeenCalledWith(0);
        expect(global.setupPlayer).toHaveBeenCalled();
    });

    test('loadLevel sets up the level correctly', () => {
        game.loadLevel(1, false);
        expect(global.setupMaze).toHaveBeenCalledWith(1);
        expect(global.updateLevel).toHaveBeenCalledWith(2); // Level is index + 1
    });

    test('showOverlay displays the overlay with correct message', () => {
        game.showOverlay('Test Message', true);
        const overlay = document.getElementById('overlay');
        const msg = document.getElementById('overlay-message');
        const nextBtn = document.getElementById('nextBtn');
        
        expect(overlay.style.display).toBe('flex');
        expect(msg.textContent).toBe('Test Message');
        expect(nextBtn.style.display).toBe('inline-block');
    });
});
