const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const jdb = new qdb.table("cezalar");
const db = new qdb.table("ayarlar");
const conf = require('../ayarlar.json');

module.exports.execute = async (client, message, args, ayar, emoji) => {
   if(!["785203149584859166"].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`Unmute komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`)).then(x => x.delete({timeout: 5000}));
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter("Throne 🖤 Cross").setColor(client.randomColor()).setTimestamp();
  if(!conf.muteciRolleri) return message.channel.send("**Roller ayarlanmamış!**").then(x => x.delete({timeout: 5000}));
  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!uye) return message.channel.send(embed.setDescription("Geçerli bir üye belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  if (message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(embed.setDescription(`Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`)).then(x => x.delete({timeout: 5000}));
  let muteler = jdb.get(`mute`) || [];
  let tempmuteler = jdb.get(`tempmute`) || [];
  let tempsmuteler = jdb.get(`tempsmute`) || [];
  uye.roles.remove(conf.muteRolu).catch();
  if (muteler.some(j => j.includes(uye.id))) jdb.set(`mute`, muteler.filter(x => !x.includes(uye.id)));
  if (tempmuteler.some(j => j.id === uye.id)) jdb.set(`tempmute`, tempmuteler.filter(x => x.id !== uye.id));
  if (tempsmuteler.some(j => j.id === uye.id)) jdb.set(`tempsmute`, tempsmuteler.filter(x => x.id !== uye.id));
  message.channel.send(embed.setDescription(`${uye} üyesinin, ${message.author} tarafından mutesi kaldırıldı!`)).catch();
  if(conf.muteLogKanali && client.channels.cache.has(conf.muteLogKanali)) client.channels.cache.get(conf.muteLogKanali).send(embed.setDescription(`${uye} üyesinin, ${message.author} tarafından mutesi kaldırıldı!`)).catch();
};
module.exports.configuration = {
  name: "unmute",
  aliases: ['unsusturma', 'susturaç', "açsusturma","susturmaaç"],
  usage: "unmute [üye]",
  description: "Belirtilen üyenin mutesini kaldırır."
};
