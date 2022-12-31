const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const fetch = require('node-fetch')
const { setGithubUrl, getMember } = require('../database')

const domain = 'https://github.com/'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('github')
        .setDescription('View most popular commands!')
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("Enter user to get his github profile")
                .setRequired(false))
        .addStringOption(option =>
            option
                .setName("url")
                .setDescription("Your github page url")
                .setRequired(false)),
    async execute(interaction) {
        await interaction.deferReply({ephemeral: true});

        const target = interaction.options.getUser('user')
        if(target) return showUserGithub(interaction, target)

        const url = interaction.options.getString('url')
        if(url) return registerGithubUrl(interaction, url)

        const embed = new EmbedBuilder()
            .setColor("#aacdef")
            .setTitle(interaction.member.user.username)

        interaction.editReply({ embeds: [embed]})
    }
}

async function showUserGithub(interaction, target) {
    const memberDocument = await getMember(interaction.guildId, target.id)
    const url = memberDocument.find(field => field.id === 'github')

    if(!url) return interaction.editReply({ content: 'That user has no github profile'})

    const name = url.value.split('/').pop()

    const promise = await fetch(`https://api.github.com/users/${name}`)
    const githubUser = await promise.json()

    const description = `Bio: **${githubUser.bio ? githubUser.bio : 'No bio'}**`

    const embed = new EmbedBuilder()
        .setColor("#aacdef")
        .setTitle(name)
        .setDescription(description)
        .addFields(
            {name: 'Followers', value: githubUser.followers.toString(), inline: true},
            {name: 'Following', value: githubUser.following.toString(), inline: true},
            {name: 'Repositories', value: githubUser.public_repos.toString(), inline: true}
        )
        .setFooter({text: `${url.value}`})

    interaction.editReply({ embeds: [embed]})
}

async function registerGithubUrl(interaction, url) {
    if(url.startsWith(domain)) {
        await setGithubUrl(interaction.user.id, interaction.guildId, url)
        interaction.editReply({content: `Your github url updated to: <${url}>`, ephemeral: true})
    } else {
        interaction.editReply({content: `I think its not valid url. It has to start with <${domain}>`, ephemeral: true})
    }
    
}