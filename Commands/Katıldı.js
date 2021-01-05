const { MessageEmbed } = require("discord.js");
const ayar = require("../ayarlar.json");

module.exports.execute = async (client, message, args, ayar, emoji) => {
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter("Throne ❤️ Cross").setColor(client.randomColor()).setTimestamp();
  if(!("785203149677920263")) return message.channel.send("**Roller ayarlanmamış!**").then(x => x.delete({timeout: 5000}));
  if(!message.member.roles.cache.has("785203149677920263")) return message.channel.send(embed.setDescription(`Yoklama komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`)).then(x => x.delete({timeout: 5000}));
  if(!message.member.voice || message.member.voice.channelID != ("785203151388803102")) return;
  
  let members = message.guild.members.cache.filter(member => member.roles.cache.has("791324732792111134") && member.voice.channelID != ("785203151388803102"));
  members.array().forEach((member, index) => {
    setTimeout(() => {
      member.roles.remove("791324732792111134").catch();
    }, index * 1250)
  });
  let verildi = message.member.voice.channel.members.filter(member => !member.roles.cache.has("791324732792111134") && !member.user.bot)
  verildi.array().forEach((member, index) => {
    setTimeout(() => {
      member.roles.add("791324732792111134").catch();
    }, index * 1250)
  });
  message.channel.send(embed.setDescription(`Katıldı rolü dağıtılmaya başlandı! 
  
  🟢 **Rol Verilecek:** ${verildi.size} 
  🔴 **Rol Alınacak:** ${members.size}`)).catch();
};
module.exports.configuration = {
  name: "yoklama",
  aliases: ['katıldı'],
  usage: "yoklama",
  description: "Katıldı rolü dağıtır."
};