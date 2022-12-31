const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('what_to_do')
        .setDescription('What activity you could do today :) !'),
    async execute(interaction) {        
        await interaction.deferReply()

        const response = await fetch('http://www.boredapi.com/api/activity/', {
            method: 'get',
            headers: {'Accept': 'application/json'}
        })

        if(response.status !== 200) 
            return interaction.editReply("Sorry, something went wrong :( ")

        const activity = await response.json()

        let activityDescription = activity.activity

        if(activity.link) activityDescription = activityDescription.concat(`\n Take a look on that: ${activity.link}`)

        const embed = new EmbedBuilder()
            .setColor("#aacdef")
            .setTitle("Bored Api")
            .setDescription(activityDescription)
            .addFields(
                {name: "type", value: activity.type.toString(), inline: true},
                {name: "participants", value: activity.participants.toString(), inline: true},
                {name: "price", value: activity.price.toString(), inline: true},
            )
            .setFooter({text: "Api used: http://www.boredapi.com/"})

        interaction.editReply({embeds: [embed]})
    }
}