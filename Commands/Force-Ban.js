const { MessageEmbed } = require("discord.js");
const qdb = require('quick.db');
const kdb = new qdb.table("kullanici");
const conf = require('../ayarlar.json');

module.exports.execute = async (client, message, args, ayar, emoji) => {
      if(!message.member.roles.cache.has(conf.banciRolleri) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin.`);
    let user = args[0];
    if (isNaN(user)) return message.reply('Bir kullanıcı **İD** girmelisiniz!');
    const sebep = args.splice(1, args.length).join(' ') || `Sebebi yok!`;
         message.guild.members.ban(user.id, {reason: sebep}).catch().then(() => {
        message.channel.send(`\`${user}\`, ${sebep} nedeniyle **Banlandı!**`);
            
  })
            .catch((err) => {
                console.log(err);
            }); 
    
};
module.exports.configuration = {
  name: "ıdban",
  aliases: ['ıdban', 'idban', 'forceban'],
  usage: "ıdban [üye] [sebep]",
  description: "Belirtilen üyeyi süreli muteler."
};
