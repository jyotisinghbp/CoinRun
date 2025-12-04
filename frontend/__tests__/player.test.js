/**
 * @jest-environment jsdom
 */

const playerModule = require('../js/player');

describe('Player Logic', () => {
    beforeEach(() => {
        // Mock globals required by player.js
        global.tileWidth = 20;
        global.tileHeight = 20;
        global.cols = 10;
        global.rows = 10;
        
        // Mock maze: 0 is path, 1 is wall
        global.maze = [
            [0, 0, 1],
            [1, 0, 0],
            [0, 0, 0]
        ];

        global.checkCoinCollection = jest.fn();
        global.checkCollisions = jest.fn();
        global.drawGame = jest.fn();
        
        // Mock canvas context
        global.ctx = {
            drawImage: jest.fn(),
            fillRect: jest.fn()
        };
        
        playerModule.setPlayer({ x: 0, y: 0 });
    });

    test('movePlayer updates position for valid move', () => {
        playerModule.movePlayer(1, 0); // Move right
        const p = playerModule.getPlayer();
        expect(p.x).toBe(1);
        expect(p.y).toBe(0);
        expect(global.drawGame).toHaveBeenCalled();
    });

    test('movePlayer does not update position for wall collision', () => {
        playerModule.setPlayer({ x: 0, y: 0 });
        playerModule.movePlayer(0, 1); // Move down into wall (0,1 is 1 in mock maze)
        const p = playerModule.getPlayer();
        expect(p.x).toBe(0);
        expect(p.y).toBe(0);
    });

    test('movePlayer does not update position for out of bounds', () => {
        playerModule.setPlayer({ x: 0, y: 0 });
        playerModule.movePlayer(-1, 0); // Move left out of bounds
        const p = playerModule.getPlayer();
        expect(p.x).toBe(0);
        expect(p.y).toBe(0);
    });
});
