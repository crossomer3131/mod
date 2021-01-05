const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const db = new qdb.table("ayarlar");
const jdb = new qdb.table("cezalar");
const kdb = new qdb.table("kullanici");
const conf = require('../ayarlar.json');
const ms = require('ms');

module.exports.execute = async (client, message, args, ayar, emoji) => {
   if(!["785203149584859167"].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission("ADMINISTRATOR"))return message.channel.send(embed.setDescription(`Vmute komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`)).then(x => x.delete({timeout: 5000}));
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter("Throne 🖤 Cross").setColor(client.randomColor()).setTimestamp();
  if(!conf.muteciRolleri) return message.channel.send("**Roller ayarlanmamış!**").then(x => x.delete({timeout: 5000}));
  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!uye) return message.channel.send(embed.setDescription("Geçerli bir üye belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  if (message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(embed.setDescription(`Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`)).then(x => x.delete({timeout: 5000}));
  let muteler = jdb.get(`tempsmute`) || [];
  let sure = args[1];
  let reason = args.splice(2).join(" ");
  if(!sure || !ms(sure) || !reason) return message.channel.send(embed.setDescription("Geçerli bir süre (1s/1m/1h/1d) ve sebep belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  if(uye.voice.channel) uye.voice.setMute(true).catch();
  if (!muteler.some(j => j.id == uye.id)) {
    jdb.push(`tempsmute`, {id: uye.id, kalkmaZamani: Date.now()+ms(sure)})
    kdb.add(`kullanici.${message.author.id}.sesmute`, 1);
    kdb.push(`kullanici.${uye.id}.sicil`, {
      Yetkili: message.author.id,
      Tip: "VMUTE",
      Sebep: reason,
      Zaman: Date.now()
    });
  };
   let zamandilimi = sure
.replace("m", " dakika")
.replace("s", " saniye")
.replace("h", " saat")
.replace("d", " d");
  
  message.channel.send(embed.setDescription(`${uye} üyesi, ${message.author} tarafından **${zamandilimi}** boyunca **${reason}** nedeniyle seste mutelendi!`)).catch();
  if(conf.muteLogKanali && 
     client.channels.cache.has("785203150546010137")) 
    client.channels.cache.get("785203150546010137").send(embed
.setDescription(`
**Ses Kanallarında Susturuldu !**

**Kullanıcı:** <@${uye.id}> (\`${uye.id}\`)
**Yetkili:** <@${message.author.id}> (\`${message.author.id}\`)
**Süre:** (\`${zamandilimi}\`)
**Sebep:** (\`${reason}\`)
        
`)).catch();
};





module.exports.configuration = {
  name: "sesmute",
  aliases: ['ses-mute', 'vmute', 'voicemute'],
  usage: "sesmute [üye] [süre] [sebep]",
  description: "Belirtilen üyeyi seste belirtilen süre kadar muteler."
};
