const { Client, Intents, Collection } = require('discord.js')
const config = require('./config.json')
const fs = require('node:fs')
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
})
client.commands = new Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for(const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
    console.log('⏱ | loaded file : ' + file)
}
client.on('ready', () => {
    console.log(`${client.user.tag} is ready!`)
})
client.on('messageCreate', (message) => {
    if(message.author.bot) return
    if(!message.content.startsWith(config.PREFIX)) return
    // Code provided by https://github.com/snapdeus/
    const args = message.content.slice(config.PREFIX.length).trim().split(' ')
    const command = args.shift().toLowerCase()
    if(!client.commands.has(command)) return
    try {
        client.commands.get(command).execute(client, message, args)
    } catch {
        message.reply(`There was an error while executing your request!`)
    }
})
client.login(config.TOKEN)