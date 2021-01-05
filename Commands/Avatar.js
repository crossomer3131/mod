const { MessageEmbed } = require("discord.js");

module.exports.execute = (client, message, args, ayar, emoji) => {
	let victim = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
	let avatar = victim.avatarURL({ dynamic: true, size: 2048 });
  message.channel.send(avatar)
};
module.exports.configuration = {
    name: "avatar",
    aliases: ["pp","av"],
    usage: "avatar [üye]",
    description: "Belirtilen üyenin avatarını gösterir."
};