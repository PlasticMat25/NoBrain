const LEVELS = 25;
const x = 0.08
const y = 1.5

const levelCheckpoints = [ ]

const xpNeededForNextLevel = (level) => Math.floor(Math.pow(level / x, y))

for(let i = 0; i < LEVELS - 1; i++) {
    const level = i + 1

    levelCheckpoints.push(xpNeededForNextLevel(level, x, y))
}

const convertXpToLevel = (xp) => {
    for(let i = 0; i < LEVELS; i++) {
        const xpNeeded = levelCheckpoints[i]
        conso  
        if(xp < xpNeeded) return i + 1
    }

    return LEVELS
}

module.exports = {
    convertXpToLevel,
}