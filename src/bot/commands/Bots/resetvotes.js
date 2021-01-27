const { Command } = require('klasa');
const Bots = require("@models/bots");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            permissionLevel: 8,
        });
    }

    async run(message) {
        await Bots.updateMany({}, { likes: 1 });
        message.channel.send('Successfully Reset all Bot Likes to 0')
};}