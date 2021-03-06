const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const Bots = require("@models/bots");

const { server: {mod_log_id, role_ids} } = require("@root/config.json");

const reasons = {
    "1": `Your Bot Spam The Server`,
    "2": `Your Bot Spam My Fans Dms.`,
    "3": `The long description on your bot's page is filled out with spam`,
    "4": `Your bot was offline for 14 days`,
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
            description: "Remove a bot from the DisCloud",
            usage: '[Member:user]'
        });
    }

    async run(message, [Member]) {
        if (!Member || !Member.bot) return message.channel.send(`You didn't ping a bot to remove.`)
        let e = new MessageEmbed()
            .setTitle('Reasons')
            .setColor(0x6b83aa)
            .addField(`Removing bot`, `${Member}`)
        let cont = ``;
        for (let k in reasons) {
            let r = reasons[k];
            cont += ` - **${k}**: ${r}\n`
        }
        cont += `\nEnter a valid reason number or your own reason.`
        e.setDescription(cont)
        message.channel.send(e);
        let filter = m => m.author.id === message.author.id;

        let collected = await message.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time'] });
        let reason = collected.first().content
        let r = collected.first().content;
        if (parseInt(reason)) {
            r = reasons[reason]
            if (!r) return message.channel.send("Inavlid reason number.")
        }

        let bot = await Bots.findOne({ botid: Member.id }, { _id: false });
        await Bots.updateOne({ botid: Member.id }, { $set: { state: "deleted", owners: {primary: bot.owners.primary, additional: []} } });
        const botUser = await this.client.users.fetch(Member.id);

        if (!bot) return message.channel.send(`Unknown Error. Bot not found.`)
        let owners = [bot.owners.primary].concat(bot.owners.additional)
        e = new MessageEmbed()
            .setTitle(' <:crossmark:806251297971634206> Bot Remove')
            .addField(`Bot`, `<@${bot.botid}>`, true)
            .addField("Reason", reason, true)
            .setThumbnail(botUser.displayAvatarURL({format: "png", size: 256}))
            .setTimestamp()
            .setColor(808080)
        modLog.send(e)
        modLog.send(owners.map(x => x ? `<@${x}>` : "")).then(m => { m.delete() });
        message.channel.send(`Removed <@${bot.botid}> Check <#${mod_log_id}>.`)
        
        owners = await message.guild.members.fetch({user: owners})
        owners.forEach(o => {
            o.send(  ` <:crossmark:806251297971634206> Your bot named ${bot.username} has been removed:\n>>> ${r}`)
        })
        if (!message.client.users.cache.find(u => u.id === bot.botid).bot) return;
        try {
            message.guild.members.fetch(message.client.users.cache.find(u => u.id === bot.botid))
                .then(bot => {
                    bot.kick().then(() => {})
                        .catch(e => { console.log(e) })
                }).catch(e => { console.log(e) });
        } catch (e) { console.log(e) }
    }

    async init() {
        modLog = this.client.channels.cache.get(mod_log_id);
    }
};
