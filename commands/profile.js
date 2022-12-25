const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { convertXpToLevel } = require('../level/level')
const { getMember } = require('../database')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('View your profile card!'),
    async execute(interaction) {
        const member = await getMember(interaction.guildId, interaction.user.id)
        const xp = member.find(field => field.id == "xp")?.value

        console.log(interaction.member.avatarURL())

        const embed = new EmbedBuilder()
            .setColor("#aacdef")
            .setTitle(interaction.member.user.username)
            .setDescription('This is your profile card :)')
            .setThumbnail(interaction.member.user.displayAvatarURL() || "https://cdn.discordapp.com/embed/avatars/0.png")
            .addFields(
                {name: 'xp points', value: xp.toString(), inline: true },
                {name: 'Level', value: convertXpToLevel(xp).toString(), inline: true }
            )

        interaction.reply({embeds: [embed], ephemeral: true})
    }
}