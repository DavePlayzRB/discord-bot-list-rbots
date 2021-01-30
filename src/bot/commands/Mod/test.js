
const { server: {mod_log_id, role_ids} } = require("@root/config.json");

const reasons = {
    "1": `Your bot was offline when we tried to verify it.`,
    "2": `Your bot is a clone of another bot`,
    "3": `Your bot responds to other bots`,
    "4": `Your bot doesn't have any enough working commands. (Minimum: 7)`,
    "5": `Your bot has NSFW commands that work in non-NSFW marked channels`,
    "6": `Your bot doesn't have a working help command or commands list`
}
var modLog;

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'remove',
            runIn: ['text'],
            aliases: ["delete"],
            permissionLevel: 8,
            botPerms: ["SEND_MESSAGES"],
            description: "Testing Command",
            usage: '[Member:user]'
        });
    }