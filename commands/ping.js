module.exports = {
    name: "ping",
    description: "Check if the bot is alive or not",
    async execute(client, message, args) {
        message.reply(`🏓 Pong! My ping is \`${client.ws.ping} ms\``)
    }
}