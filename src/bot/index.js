
const { Client, Schema } = require('klasa');
const {server: {role_ids: {bot_verifier}}, discord_client: {prefix}} = require("@root/config.json");

Client.defaultPermissionLevels
    .add(8, ({ guild, member }) => member.roles.cache.has(bot_verifier));

const constant = require('discord.js/src/util/Constants.js')
constant.DefaultOptions.ws.properties.$browser = `Discord iOS`


const client = new Client({
    commandEditing: true,
    prefix: prefix,
    production: true,
    consoleEvents: {
        log: false,
        error: false,
        warn: false
    },
    disabledCorePieces: ["commands"]
});

//Bot Status
client.once('ready', () => {
    client.user.setActivity('DisCloud Bots', { type: "WATCHING" });
});

module.exports.init = async (token) => {
    client.userBaseDirectory = __dirname;
    await client.login(token);
    return client;
}
