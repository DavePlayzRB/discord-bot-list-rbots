const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const Bots = require("@models/bots");

const { server: {mod_log_id, role_ids} } = require("@root/config.json");

var modLog;

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            permissionLevel: 9,
            usage: '[User:user]'
        });
    }

    async run(message, [user]) {
        if (!user || !user.bot) return message.channel.send(`Ping a **bot**.`);
        let bot = await Bots.findOne({botid: user.id}, { _id: false });

        const botUser = await this.client.users.fetch(user.id);
        if (bot.logo !== botUser.displayAvatarURL({format: "png", size: 256}))
            await Bots.updateOne({ botid: user.id }, {$set: {certification: "certified", logo: botUser.displayAvatarURL({format: "png", size: 256})}});
        else 
            await Bots.updateOne({ botid: user.id }, {$set: { certification: "certified" } })
        
        let owners = [bot.owners.primary].concat(bot.owners.additional)
        let e = new MessageEmbed()
            .setTitle('Bot Certified')
            .addField(`Bot`, `<@${bot.botid}>`, true)
            .addField(`Owner(s)`, owners.map(x => x ? `<@${x}>` : ""), true)
            .addField("Mod", message.author, true)
            .setThumbnail(botUser.displayAvatarURL({format: "png", size: 256}))
            .setThumbnail('https://media.discordapp.net/attachments/804066817567883294/805732470691594250/PngItem_2986122.png?width=457&height=457')
            .setTimestamp()
            .setColor(0xff9933)
        modLog.send(e);
        modLog.send(owners.map(x => x ? `<@${x}>` : "")).then(m => { m.delete() });

        owners = await message.guild.members.fetch({user:owners})
        owners.forEach(o => {
            o.roles.add(message.guild.roles.cache.get(role_ids.certified_dev));
            o.send(`Your bot \`${bot.username}\` has been Certified on Botlists.`)
        })
        message.guild.members.fetch(message.client.users.cache.find(u => u.id === bot.botid)).then(bot => {
            bot.roles.set([role_ids.bot, role_ids.verified, role_ids.certified_bot]);
        })
        message.channel.send(`Certified \`${bot.username}\``);
    }

    async init() {
        modLog = this.client.channels.cache.get(mod_log_id);
    }
};