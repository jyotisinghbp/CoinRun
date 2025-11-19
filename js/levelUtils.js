// Utilities to build runtime enemy and fire objects from level config
function makeEnemies(cfg) {
    const out = [];
    if (!cfg || !Array.isArray(cfg.enemies)) return out;
    cfg.enemies.forEach(e => {
        out.push({
            x: e.x,
            y: e.y,
            path: e.path ? JSON.parse(JSON.stringify(e.path)) : [{ x: e.x, y: e.y }],
            pathIndex: 0
        });
    });
    return out;
}

function makeFires(cfg) {
    const out = [];
    if (!cfg || !Array.isArray(cfg.fires)) return out;
    cfg.fires.forEach(f => {
        out.push({
            path: JSON.parse(JSON.stringify(f.path)),
            idx: f.idx || 0,
            direction: f.direction || 1,
            activeIndex: f.idx || 0
        });
    });
    return out;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { makeEnemies, makeFires };
}
