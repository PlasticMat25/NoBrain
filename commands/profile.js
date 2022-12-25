const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

const { getMember } = require('../database')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('View your profile card!'),
    async execute(interaction) {
        console.log(interaction)
        const member = await getMember(interaction.guildId, interaction.user.id)
        console.log(member)
        interaction.reply({content: 'Hello world', ephemeral: true})
    }
}