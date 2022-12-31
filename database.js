const { QuickDB } = require('quick.db')

const database = new QuickDB()

const tables = {
    member: 'member',
    command: 'command'
}

const keys = {
    xp: 'xp',
    github: 'github'
}

const pre = (key) => "db".concat(key)
const getCollection = (guildId, table) => database.table(pre(guildId)).table(table)

const addXp = (userId, guildId, amount) => {
    const memberCollection = getCollection(guildId, tables.member)
    const memberDocument = memberCollection.table(pre(userId))

    return memberDocument.add(keys.xp, amount)
}

const setGithubUrl = (userId, guildId, url) => {
    const memberCollection = getCollection(guildId, tables.member)
    const memberDocument = memberCollection.table(pre(userId))
    
    return memberDocument.set(keys.github, url)
}

const getMember = (guildId, userId) => {

    const memberCollection = getCollection(guildId, tables.member)
    const memberDocument = memberCollection.table(pre(userId))
    
    return memberDocument.all()
}

const commandStats = (name) => {
    const commandCollection = database.table(tables.command)
    commandCollection.add(name, 1)
}

const getCommands = () => {
    const all = database.table(tables.command).all()
    return all
}

module.exports = { database, setGithubUrl, addXp, getMember, commandStats, getCommands }