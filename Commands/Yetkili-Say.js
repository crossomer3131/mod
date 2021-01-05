const { MessageEmbed } = require("discord.js");
module.exports.execute = async (client, message, args, ayar, emoji) => {

//-------------------------------------------------------------------------------\\

if(!["785203149551697929"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));

//-------------------------------------------------------------------------------\\
  
  
  let ramo = "**Sesli Kanalda Olan Yetkililer:**\n";
  let ramo2 = "**Sesli Kanalda Olmayan Yetkililer:**\n";
  message.guild.roles.cache.get("785203149551697929").members.map(r => {
    ramo += r.voice.channel ? "•  <@" + r.user.id + ">\n" : "";
    ramo2 += !r.voice.channel ? "•  <@" + r.user.id + ">\n" : "";
  });

  const ramoembed = new MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
    .setColor("RANDOM")
    .setTimestamp()
    .setDescription("" + ramo + "" + ramo2 + "")
  message.channel.send(ramoembed).then(s => s.s);
};
module.exports.configuration = {
    name: "yetkilises",
    aliases: ["yetkilises","sesteki-yetkililer"],
    usage: "yetkilises",
    description: "Sunucu sayımı."
};