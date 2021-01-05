
const { MessageEmbed } = require("discord.js");

module.exports.execute = async(client, message, args, ayar, emoji) => {
   if(!message.member.hasPermission("ADMINISTRATOR"));
	let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter("Throne ❤️ Cross").setColor(client.randomColor()).setTimestamp();
  if (!uye) return message.channel.send(embed.setDescription("Ses odana çekilecek üyeyi belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  if (!message.member.voice.channel || !uye.voice.channel || message.member.voice.channelID == uye.voice.channelID) return message.channel.send(embed.setDescription("Belirtilen üyenin ve kendinin ses kanalında olduğundan emin ol!")).then(x => x.delete({timeout: 5000}));
  {

  uye.voice.setChannel(message.member.voice.channelID);
  };
  
};
module.exports.configuration = {
    name: "çek2",
    aliases: ['move2', 'taşı2'],
    usage: "çek2 [üye]",
    description: "Belirtilen üyeyi ses kanalınıza çekmeyi sağlar."
};