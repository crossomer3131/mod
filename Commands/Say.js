const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const db = new qdb.table("ayarlar");
const ayar = require('../ayarlar.json');

// module.exports.onLoad = (client) => {}
module.exports.execute = (client, message, args, ayar, emoji) => {

  let ekipRolu = ("785203149514342498");
  let boosterRolu = ("788673089663402024");
  const embed = new MessageEmbed()
  .setColor('BLUE')
  message.channel.send(embed
.setDescription(`
<a:maviyildiz:787421620360445962> Sunucumuzda Toplam ${client.emojiSayi(`${message.guild.memberCount}`)} Üye bulunmakta.
<a:maviyildiz:787421620360445962> Sunucumuzda Toplam ${client.emojiSayi(`${message.guild.members.cache.filter(u => u.presence.status != "offline").size}`)} Çevrimiçi üye bulunmakta
<a:maviyildiz:787421620360445962> Ses kanallarında toplam ${client.emojiSayi(`${message.guild.channels.cache.filter(channel => channel.type == "voice").map(channel => channel.members.size).reduce((a, b) => a + b)}`)} Üye bulunmakta
<a:maviyildiz:787421620360445962> Tagımızda Toplam ${client.emojiSayi(`${message.guild.roles.cache.get(ekipRolu).members.size}`)} Kişi bulunmakta
<a:maviyildiz:787421620360445962> Sunucumuza Toplam ${client.emojiSayi(`${message.guild.roles.cache.get(boosterRolu).members.size}`) || "Ayarlanmamış"} Kişi takviye yaptı
`)); 
};

module.exports.configuration = {
    name: "say",
    aliases: ["count","yoklama"],
    usage: "say",
    description: "Sunucu sayımı."
};