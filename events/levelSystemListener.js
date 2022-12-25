const { Events } = require('discord.js')

const { convertXpToLevel } = require('../level/level')
const { addXp, getMember } = require('../database')

function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        const memberDocument = await getMember(message.guildId, message.author.id) 
        
        if(!memberDocument) return
        
        const xpField = memberDocument.find(field => field.id == 'xp')
        const oldXp = xpField?.value
        const oldLevel = convertXpToLevel(oldXp)
        const currentXp = await addXp(message.author.id, message.guildId, randomIntFromInterval(5, 10))
        const currentLevel = convertXpToLevel(currentXp)

        const levelChannel = message.client.channels.cache.get('1056448017949016174')
        
        if(oldLevel < currentLevel) {
            levelChannel.send(`Ο χρήστης <@${message.author.id}> έχει φτάσει το **επίπεδο ${currentLevel}**`)
        }
    }
}