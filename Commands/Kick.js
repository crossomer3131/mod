const { MessageEmbed } = require("discord.js");
const qdb = require('quick.db');
const kdb = new qdb.table("kullanici");
const conf = require('../ayarlar.json');

module.exports.execute = async (client, message, args, ayar, emoji) => {
    if(!["788079178225811458"].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`Kick komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`)).then(x => x.delete({timeout: 5000}));
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter("Throne 🖤 Cross").setColor(client.randomColor()).setTimestamp();
  if(!conf.banciRolleri) return message.channel.send(embed.setDescription("Sunucuda herhangi bir `YASAKLAMA(BAN)` rolü tanımlanmamış. `PANEL` komutunu kullanmayı deneyin.")).then(x => x.delete({timeout: 5000}));
  let victim = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let reason = args.splice(1).join(" ");
  if (!victim || !reason) return message.channel.send(embed.setDescription("Geçerli bir üye ve sebep belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  if(message.member.roles.highest.position <= victim.roles.highest.position) return message.channel.send(embed.setDescription("Kicklemeye çalıştığın üye senle aynı yetkide veya senden üstün!")).then(x => x.delete({timeout: 5000}));
  if(!victim.kickable) return message.channel.send(embed.setDescription("Botun yetkisi belirtilen üyeyi kicklemeye yetmiyor!")).then(x => x.delete({timeout: 5000}));
  await victim.send(embed.setDescription(`${message.author} tarafından **${reason}** sebebiyle sunucudan kicklendin.`)).catch();
  victim.kick({reason: reason}).then(x => message.react(client.emojiler.onay)).catch();
  kdb.add(`kullanici.${message.author.id}.kick`, 1);
    kdb.push(`kullanici.${victim.id}.sicil`, {
      Yetkili: message.author.id,
      Tip: "KICK",
      Sebep: reason,
      Zaman: Date.now()
    });
  message.channel.send(embed.setDescription(`\`${victim.user.tag}\` üyesi ${message.author} tarafından **${reason}** nedeniyle **kicklendi!**`));
  if(conf.banLogKanali && client.channels.cache.has(conf.banLogKanali)) client.channels.cache.get(conf.banLogKanali).send(new MessageEmbed().setColor(client.randomColor()).setTimestamp().setFooter("Throne 🖤 Cross").setTitle('Üye Kicklendi!').setDescription(`**Kickleyen Yetkili:** ${message.author} (${message.author.id})\n**Kicklenen Üye:** ${victim.user.tag} (${victim.user.id})\n**Sebep:** ${reason}`));
};
module.exports.configuration = {
  name: "kick",
  aliases: ["at"],
  usage: "kick [üye] [sebep]",
  description: "Belirtilen üyeyi sunucudan atar."
};
