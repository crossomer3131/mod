const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const jdb = new qdb.table("cezalar");
const db = new qdb.table("ayarlar");
const kdb = new qdb.table("kullanici");
const conf = require('../ayarlar.json');

module.exports.execute = async (client, message, args, ayar, emoji) => {
  
   if(!["785203149584859168"].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`Jail komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`)).then(x => x.delete({timeout: 5000}));
  
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter("Throne 🖤 Cross").setColor(client.randomColor()).setTimestamp();
  if(!conf.jailRolu || !conf.jailciRolleri && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**Roller ayarlanmamış!**").then(x => x.delete({timeout: 5000}));
  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let reason = args.splice(1).join(" ");
  if(!uye || !reason) return message.channel.send(embed.setDescription("Geçerli bir üye ve sebep belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  if (message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(embed.setDescription(`Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`)).then(x => x.delete({timeout: 5000}));
  let jaildekiler = jdb.get(`jail`) || [];
  await uye.roles.set(uye.roles.cache.has(conf.boosterRolu) ? [conf.jailRolu, conf.boosterRolu] : [conf.jailRolu]).catch();
  if (!jaildekiler.some(j => j.includes(uye.id))) {
    jdb.push(`jail`, `j${uye.id}`);
    kdb.add(`kullanici.${message.author.id}.jail`, 1);
    kdb.push(`kullanici.${uye.id}.sicil`, {
      Yetkili: message.author.id,
      Tip: "JAIL",
      Sebep: reason,
      Zaman: Date.now()
    });
  };
  if(uye.voice.channel) uye.voice.kick().catch();
  message.channel.send(embed.setDescription(`${uye} Adlı Üye, ${message.author} tarafından **${reason}** nedeniyle jaile atıldı!`)).catch();
  if(conf.jailLogKanali && client.channels.cache.has(conf.jailLogKanali)) client.channels.cache.get(conf.jailLogKanali).send(embed.setDescription(`${uye} üyesi, ${message.author} tarafından **${reason}** nedeniyle jaile atıldı!`)).catch();
};
module.exports.configuration = {
  name: "jail",
  aliases: ['cezalı', 'ceza'],
  usage: "jail [üye] [sebep]",
  description: "Belirtilen üyeyi jaile atar."
};
