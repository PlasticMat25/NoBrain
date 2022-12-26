const { Events } = require('discord.js')

const { commandStats } = require('../database')

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return

        const { client, commandName } = interaction
    
        const command = client.commands.get(commandName)
        if(!command) return console.error(`No command matching ${commandName} was found.`)
    
        commandStats(commandName)

        try {
            await command.execute(interaction)
        } catch ( error ) {
            console.error(error)
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true})
        }
    } 
}