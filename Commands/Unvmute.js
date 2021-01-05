const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const jdb = new qdb.table("cezalar");
const db = new qdb.table("ayarlar");
const conf = require('../ayarlar.json');

module.exports.execute = async (client, message, args, ayar, emoji) => {
  if(!["785203149584859167"].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`Unvmute komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`)).then(x => x.delete({timeout: 5000}));
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter("Throne 🖤 Cross").setColor(client.randomColor()).setTimestamp();
  if(!conf.muteciRolleri) return message.channel.send("**Roller ayarlanmamış!**").then(x => x.delete({timeout: 5000}));
  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!uye) return message.channel.send(embed.setDescription("Geçerli bir üye belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  if (message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(embed.setDescription(`Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`)).then(x => x.delete({timeout: 5000}));
  if (uye.voice.channel) uye.voice.setMute(false);
  message.channel.send(embed.setDescription(`${uye} üyesinin, ${message.author} tarafından mutesi kaldırıldı!`)).catch();
  if(conf.muteLogKanali && client.channels.cache.has(conf.muteLogKanali)) client.channels.cache.get(conf.muteLogKanali).send(embed.setDescription(`${uye} üyesinin, ${message.author} tarafından mutesi kaldırıldı!`)).catch();
};
module.exports.configuration = {
  name: "unvmute",
  aliases: ["unvmute"],
  usage: "unvmute [üye]",
  description: "Belirtilen üyenin mutesini kaldırır."
};
