const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const db = new qdb.table("ayarlar");
const jdb = new qdb.table("cezalar");
const kdb = new qdb.table("kullanici");
const ms = require('ms');
const conf = require('../ayarlar.json');

module.exports.execute = async (client, message, args, ayar, emoji) => {
   if(!["785203149584859166"].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`Tempmute komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`)).then(x => x.delete({timeout: 5000}));
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter("Throne 🖤 Cross").setColor(client.randomColor()).setTimestamp();
  if(!conf.muteRolu || !conf.muteciRolleri) return message.channel.send("**Roller ayarlanmamış!**").then(x => x.delete({timeout: 5000}));
  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!uye) return message.channel.send(embed.setDescription("Geçerli bir üye belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  if (message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(embed.setDescription(`Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`)).then(x => x.delete({timeout: 5000}));
  let muteler = jdb.get(`tempmute`) || [];
  let sure = args[1];
  let reason = args.splice(2).join(" ");
  if(!sure || !ms(sure) || !reason) return message.channel.send(embed.setDescription("Geçerli bir süre (1s/1m/1h/1d) ve sebep belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  await uye.roles.add(conf.muteRolu).catch();
  if (!muteler.some(j => j.id == uye.id)) {
    jdb.push(`tempmute`, {id: uye.id, kalkmaZamani: Date.now()+ms(sure)})
    kdb.add(`kullanici.${message.author.id}.mute`, 1);
    kdb.push(`kullanici.${uye.id}.sicil`, {
      Yetkili: message.author.id,
      Tip: "MUTE",
      Sebep: reason,
      Zaman: Date.now()
    });
  };
  let zamandilimi = sure
.replace("m", " dakika")
.replace("s", " saniye")
.replace("h", " saat")
.replace("d", " d");
  
  message.channel.send(embed.setDescription(`${uye} üyesi, ${message.author} tarafından **${zamandilimi}** boyunca **${reason}** nedeniyle mutelendi!`)).catch();
  if(conf.muteLogKanali && client.channels.cache.has("785203150546010136")) 
    client.channels.cache.get("785203150546010136").send(embed
.setDescription(`
**Metin Kanallarında Susturuldu !**

**Kullanıcı:** <@${uye.id}> (\`${uye.id}\`)
**Yetkili:** <@${message.author.id}> (\`${message.author.id}\`)
**Süre:** (\`${zamandilimi}\`)
**Sebep:** (\`${reason}\`)
        
`)).catch();
};
module.exports.configuration = {
  name: "tempmute",
  aliases: ['tempsusturmak', 'sürelimute', 'geçici-mute'],
  usage: "tempmute [üye] [süre] [sebep]",
  description: "Belirtilen üyeyi süreli muteler."
};
