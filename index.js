require('dotenv').config()
const {Client, Events, GatewayIntentBits, Collection} = require('discord.js')
const fs = require('node:fs')
const path = require('node:path')
const { execute } = require('./commands/ping')

const { database } = require('./database')

const intents = [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.MessageContent]

const client = new Client({intents})
client.commands = new Collection()
client.events = new Collection()

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

commandFiles.forEach(file => {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    if('data' in command && 'execute' in command)
        client.commands.set(command.data.name, command)
    else 
        console.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
})

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))

for( const file of eventFiles ) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath)

    if(event.once) 
        client.once(event.name, (...args) => event.execute(...args))
    else 
        client.on(event.name, (...args) => event.execute(...args))
}

client.once(Events.ClientReady, _ => console.log('Ready!'))

client.login(process.env.TOKEN)