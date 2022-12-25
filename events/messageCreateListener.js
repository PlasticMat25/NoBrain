const { Events } = require('discord.js')

const { addXp } = require('../database')

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        addXp(message.author.id, message.guildId, 10)
    }
}