const { MessageEmbed } = require("discord.js");
const qdb = require('quick.db');
const kdb = new qdb.table("kullanici");
const conf = require('../ayarlar.json');

module.exports.execute = async (client, message, args, ayar, emoji) => {
  if(!["785203149584859169"].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`Ban komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`)).then(x => x.delete({timeout: 5000}));
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter("Throne 🖤 Cross").setColor(client.randomColor()).setTimestamp();
  if(!conf.banciRolleri && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription("Sunucuda herhangi bir `YASAKLAMA(BAN)` rolü tanımlanmamış. `PANEL` komutunu kullanmayı deneyin.")).then(x => x.delete({timeout: 5000}));
  if(!conf.banciRolleri.some(rol => message.member.roles.cache.has(rol)) && !message.member.roles.cache.has(conf.sahipRolu) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription("Bu komutu kullanabilmek için gerekli rollere sahip değilsin!")).then(x => x.delete({timeout: 5000}));
  
  if(args[0] && args[0].includes('liste')) {
    try {
      message.guild.fetchBans().then(bans => {
        message.channel.send(`# Sunucudan Banlanan kişiler; \n\n${bans.map(c => `${c.user.id} | ${c.user.tag}`).join("\n")}\n\n# Toplam "${bans.size}" adet Kullanıcı yasaklanmış kullanıcı bulunuyor.`, {code: 'xl', split: true});
      });
	  } catch (err) { message.channel.send(`Banlı kullanıcı bulunmuyor!`).then(x => x.delete({timeout: 5000}));; }
    return;
  };
  
  if (args[0] && (args[0].includes('sorgu') || args[0].includes('info'))) {
    if(!args[1] || isNaN(args[1])) return message.channel.send(embed.setDescription(`Ban yemiş Bir kullanıcı ID'si Gir!`)).then(x => x.delete({timeout: 5000}));;
    return message.guild.fetchBan(args.slice(1).join(' ')).then(({ user, reason }) => message.channel.send(embed.setDescription(`**Banlanan Kullanıcı:** ${user.tag} (${user.id})\n**Banlanma Sebebi:** ${reason ? reason : "Sebep Yok!"}`))).catch(err => message.channel.send(embed.setDescription("Belirtilen Kullanıcıya sahip bir ban Yok!")).then(x => x.delete({timeout: 5000})));
  };
  let victim = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let reason = args.splice(1).join(" ");
  if (!reason) return message.channel.send(embed.setDescription("bir üye ve sebep Yazmalısın!")).then(x => x.delete({timeout: 5000}));
  if (!victim) {
    let kisi = await client.users.fetch(args[0]);
    if(kisi) {
      message.guild.members.ban(kisi.id, {reason: reason}).catch();
      kdb.add(`kullanici.${message.author.id}.ban`, 1);
      kdb.push(`kullanici.${victim.id}.sicil`, {
        Yetkili: message.author.id,
        Tip: "BAN",
        Sebep: reason,
        Zaman: Date.now()
      });
      message.react(client.emojiler.onay).catch();
      if(conf.banLogKanali && client.channels.cache.has(conf.banLogKanali)) client.channels.cache.get(conf.banLogKanali).send(new MessageEmbed().setColor(client.randomColor()).setTimestamp().setFooter("Throne 🖤 Cross").setTitle('Üye Banlandı!').setDescription(`**Banlayan Yetkili:** ${message.author} (${message.author.id})\n**Banlanan Üye:** ${kisi.tag} (${kisi.id})\n**Sebep:** ${reason}`));
    } else {
      message.channel.send(embed.setDescription("Bir üye ve sebep Yazmalısın!")).then(x => x.delete({timeout: 5000}));
    };
    return message.reply('Bir üye ve sebep Yazmalısın!').then(x => x.delete({timeout: 5000}));
  };
  if(message.member.roles.highest.position <= victim.roles.highest.position) return message.channel.send(embed.setDescription("üye senle aynı yetkide veya senden üstün!")).then(x => x.delete({timeout: 5000}));
  if(!victim.bannable) return message.channel.send(embed.setDescription("Botun yetkisi belirtilen Üyenin altında!")).then(x => x.delete({timeout: 5000}));
  victim.send(embed.setDescription(`${message.author} tarafından **${reason}** sebebiyle sunucudan banlandın.`)).catch();
  victim.ban({reason: reason}).then(x => message.react(client.emojiler.onay)).catch();
  kdb.add(`kullanici.${message.author.id}.ban`, 1);
  kdb.push(`kullanici.${victim.id}.sicil`, {
      Yetkili: message.author.id,
      Tip: "BAN",
      Sebep: reason,
      Zaman: Date.now()
    });
  message.channel.send(embed.setImage("https://i.pinimg.com/originals/b2/84/33/b28433c392959f923ff0d736cd89dcbd.gif").setDescription(`\`${victim.user.tag}\` üyesi ${message.author} tarafından **${reason}** nedeniyle **banlandı!**`));
  if(conf.banLogKanali && client.channels.cache.has(conf.banLogKanali)) client.channels.cache.get(conf.banLogKanali).send(new MessageEmbed().setColor(client.randomColor()).setTimestamp().setFooter("Throne 🖤 Cross").setTitle('Üye Banlandı!').setDescription(`**Banlayan Yetkili:** ${message.author} (${message.author.id})\n**Banlanan Üye:** ${victim.user.tag} (${victim.user.id})\n**Sebep:** ${reason}`));
};
module.exports.configuration = {
  name: "ban",
  aliases: ["yasakla","sik"],
  usage: "ban [üye] [sebep] / liste / bilgi [id]",
  description: "Belirtilen üyeyi sunucudan yasaklar."
};
