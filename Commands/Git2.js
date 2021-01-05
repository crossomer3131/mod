const { MessageEmbed } = require("discord.js");

module.exports.execute = async(client, message, args, ayar, emoji) => {
  if(!message.member.hasPermission("ADMINISTRATOR"));
	let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter("Throne ❤️ Cross").setColor(client.randomColor()).setTimestamp();
  if (!uye) return message.channel.send(embed.setDescription("Ses odasına gidilecek üyeyi belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  if (!message.member.voice.channel || !uye.voice.channel || message.member.voice.channelID == uye.voice.channelID) return message.channel.send(embed.setDescription("Belirtilen üyenin ve kendinin ses kanalında olduğundan emin ol!")).then(x => x.delete({timeout: 5000}));
	  message.member.voice.setChannel(uye.voice.channelID);
};
module.exports.configuration = {
    name: "git2",
    aliases: ["go2"],
    usage: "git2 [üye]",
    description: "Belirtilen üyenin ses kanalına gitmenizi sağlar."
};