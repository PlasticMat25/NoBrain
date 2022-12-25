const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { getCommands } = require('../database')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('command_stats')
        .setDescription('View most popular commands!'),
    async execute(interaction) {
        let description = ''

        const commands = await getCommands()

        commands.forEach(command => {
            description = description.concat(command.id, ": ", command.value, "\n")
        })

        const embed = new EmbedBuilder()
            .setColor("#aacdef")
            .setTitle(interaction.member.user.username)
            .setDescription(description)

        interaction.reply({embeds: [embed], ephemeral: true})
    }
}