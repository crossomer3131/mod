const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const jdb = new qdb.table("cezalar");
const db = new qdb.table("ayarlar");
const kdb = new qdb.table("kullanici");
const conf = require('../ayarlar.json');

module.exports.execute = async (client, message, args, ayar, emoji) => {
   if(!["785203149677920260","785203149677920256","785203149584859166"].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission("ADMINISTRATOR"));
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter("Throne 🖤 Cross").setColor(client.randomColor()).setTimestamp();
  if(!conf.enAltYetkiliRolu) return message.channel.send("**Roller ayarlanmamış!**").then(x => x.delete({timeout: 5000}));
  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let reason = args.splice(1).join(" ");
  if(!uye || !reason) return message.channel.send(embed.setDescription("Geçerli bir üye ve sebep belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  if (message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(embed.setDescription(`Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`)).then(x => x.delete({timeout: 5000}));
    kdb.add(`kullanici.${message.author.id}.uyari`, 1);
    kdb.push(`kullanici.${uye.id}.sicil`, {
      Yetkili: message.author.id,
      Tip: "UYARI",
      Sebep: reason,
      Zaman: Date.now()
    });
  message.channel.send(embed.setDescription(`${uye} üyesi, ${message.author} tarafından **${reason}** nedeniyle uyarıldı!`)).catch();
  if(conf.uyariLogKanali && client.channels.cache.has(conf.uyariLogKanali)) client.channels.cache.get(conf.uyariLogKanali).send(embed.setDescription(`${uye} üyesi, ${message.author} tarafından **${reason}** nedeniyle uyarıldı!`)).catch();
};
module.exports.configuration = {
  name: "uyarı",
  aliases: ['sustur'],
  usage: "uyarı [üye] [sebep]",
  description: "Belirtilen üyeyi uyarır."
};
