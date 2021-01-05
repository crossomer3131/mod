const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const jdb = new qdb.table("cezalar");
const db = new qdb.table("ayarlar");
const conf = require('../ayarlar.json');

module.exports.execute = async (client, message, args, ayar, emoji) => {
   if(!["785203149584859168"].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`Unjail komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`)).then(x => x.delete({timeout: 5000}));
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter("Throne 🖤 Cross").setColor(client.randomColor()).setTimestamp();
  if(!conf.jailRolu || !conf.jailciRolleri) return message.channel.send("**Roller ayarlanmamış!**").then(x => x.delete({timeout: 5000}));
  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!uye) return message.channel.send(embed.setDescription("Geçerli bir üye belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  if (message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(embed.setDescription(`Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`)).then(x => x.delete({timeout: 5000}));
  let jaildekiler = jdb.get(`jail`) || [];
  let tempjaildekiler = jdb.get(`tempjail`) || [];
  uye.roles.set(conf.teyitsizRolleri || []).catch();
  if (jaildekiler.some(j => j.includes(uye.id))) jdb.set(`jail`, jaildekiler.filter(x => !x.includes(uye.id)));
  if (tempjaildekiler.some(j => j.id === uye.id)) jdb.set(`tempjail`, tempjaildekiler.filter(x => x.id !== uye.id));
  if(uye.voice.channel) uye.voice.kick().catch();
  message.channel.send(embed.setDescription(`${uye} üyesi, ${message.author} tarafından jailden çıkarıldı!`)).catch();
  if(conf.jailLogKanali && client.channels.cache.has(conf.jailLogKanali)) client.channels.cache.get(conf.jailLogKanali).send(embed.setDescription(`${uye} üyesi, ${message.author} tarafından jailden çıkarıldı!`)).catch();
};
module.exports.configuration = {
  name: "unjail",
  aliases: ['uncezalı'],
  usage: "unjail [üye]",
  description: "Belirtilen üyeyi jailden çıkarır."
};
