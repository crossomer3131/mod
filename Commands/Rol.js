const { MessageEmbed } = require("discord.js");
const ayar = require('../ayarlar.json');

// module.exports.onLoad = (client) => {}
module.exports.execute = (client, message, args, ayar, emoji) => {
  
  let sunucu = client.guilds.cache.get("785203149291388948")
  let kullanıcı = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
  const vip = "785203149514342497";
  
  if(args[0] === 'vip'){
    message.guild.member(kullanıcı).roles.add(vip)
    const embed = new MessageEmbed()
    .setDescription(`<@${kullanıcı.id}> Adlı Kullanıcıya <@&785203149514342497> Rolü Verildi. `)
    message.channel.send(embed)
  }
  
  };
module.exports.configuration = {
    name: "rol",
    aliases: ["rol", 'rolver'],
    usage: "rol [uye]",
    description: "Belirtilen mesaj sayısı kadar mesaj temizler."
};