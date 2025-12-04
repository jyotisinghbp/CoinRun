/**
 * @jest-environment jsdom
 */

describe('Maze Logic', () => {
    let mazeModule;

    beforeEach(() => {
        jest.resetModules();
        document.body.innerHTML = '<canvas id="gameCanvas" width="200" height="200"></canvas>';
        
        // Mock canvas context to avoid jsdom "Not implemented" error
        const canvas = document.getElementById('gameCanvas');
        canvas.getContext = jest.fn(() => ({
            createLinearGradient: jest.fn(() => ({
                addColorStop: jest.fn()
            })),
            fillRect: jest.fn(),
            shadowColor: '',
            shadowBlur: 0
        }));

        // Mock globals
        global.levels = [
            { maze: [[1, 1], [1, 1]] }, // Level 0
            { maze: [[0, 0], [0, 0]] }  // Level 1
        ];

        mazeModule = require('../js/maze');
    });

    test('setupMaze loads maze from levels', () => {
        mazeModule.setupMaze(0);
        const m = mazeModule.getMaze();
        expect(m).toEqual([[1, 1], [1, 1]]);
    });

    test('setupMaze falls back to baseMaze if level not found', () => {
        // Undefine levels temporarily to test fallback
        const originalLevels = global.levels;
        global.levels = undefined;
        
        mazeModule.setupMaze(99);
        const m = mazeModule.getMaze();
        // Base maze is 10x10, just check it's not empty
        expect(m.length).toBe(10);
        
        global.levels = originalLevels;
    });
});
