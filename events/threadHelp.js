const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js')

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if(message.author.id != "869626295296880711") return
        if(message.channel.id != "1010990000000749719") return
        if(message.author.bot) return
        
        const thread = await message.startThread({
            name: message.content.length > 50 ? message.content.slice(0, 50).concat('...') : message.content,
            autoArchiveDuration: 60,
            reason: `${message.author.username} needs help :)`
        })

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`${message.author.id}`)
                    .setLabel('Close!')
                    .setStyle(ButtonStyle.Danger),
            );

        thread.send({
            content: "Όταν πάρεις την βοήθεια που χρειάζεσαι μπορείς να κλείσεις το thread πατώντας το κουμπί close.\nΜπορείς να αξιολογήσεις το μέλος που σε βοήθησε με 1-5 αστερακια με την εντολή ```/vote {user} {stars}```",
            components: [row]
        })

        thread.members.add(message.author)
    }
}