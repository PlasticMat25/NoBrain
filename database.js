const { QuickDB } = require('quick.db')

const database = new QuickDB()

const tables = {
    member: 'member'
}

const keys = {
    xp: 'xp'
}

const pre = (key) => "db".concat(key)
const getCollection = (guildId, table) => database.table(pre(guildId)).table(table)

const addXp = (userId, guildId, amount) => {
    const memberCollection = getCollection(guildId, tables.member)
    const memberDocument = memberCollection.table(pre(userId))

    memberDocument.add(keys.xp, amount)
}

const getMember = (guildId, userId) => {

    const memberCollection = getCollection(guildId, tables.member)
    const memberDocument = memberCollection.table(pre(userId))
    
    return memberDocument.all()
}

module.exports = { database, addXp, getMember }