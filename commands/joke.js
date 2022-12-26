const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Send me a random joke :) !'),
    async execute(interaction) {        
        const ephemeral = interaction.channelId != '921888295426879518' //memes channel id

        await interaction.deferReply({ephemeral})

        const response = await fetch('https://icanhazdadjoke.com/', {
            method: 'get',
            headers: {'Accept': 'application/json'}
        })

        if(response.status !== 200) return interaction.editReply("Sorry, something went wrong :( ")

        const joke = await response.json()

        const embed = new EmbedBuilder()
            .setColor("#aacdef")
            .setTitle("Icanhazdadjoke")
            .setDescription(joke.joke)
            .setThumbnail("https://slack-files2.s3-us-west-2.amazonaws.com/avatars/2016-08-13/69162711190_9ce4a3707b47d2a5a8d4_512.png")
            .setFooter({text: "Api we used: https://icanhazdadjoke.com/"})

        interaction.editReply({embeds: [embed]})
    }
}