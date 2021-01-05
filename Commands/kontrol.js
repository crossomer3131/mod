const { MessageEmbed } = require("discord.js");

module.exports.execute = async (client, message, args, ayar, emoji) => {
let user  
if(message.mentions.members.first()) user = message.mentions.members.first()

if(!user && args[0]) user = message.guild.members.cache.get(args[0])
if(!user) return message.reply('Birisini Etiketle Veya ID Gir!')

let sonuc 
if(!user.voice.channelID) sonuc = message.channel.send(new MessageEmbed()
.setColor('RED')
.setDescription(`Bu Kullanıcı Herhangi bir ses kanalında değil`))

if(user.voice.channelID) sonuc = message.channel.send(new MessageEmbed()
.setColor('BLUE')
.setDescription(`${user} İsimli Kişi <#${user.voice.channelID}> İsimli Sesli Odada!`))

message.channel.send(sonuc)

}
module.exports.configuration = {
  name: "kontrol",
  aliases: ['kontrol','ses'],
  usage: "kontrol",
  description: "Belirtilen üyeyi seste belirtilen süre kadar muteler."
};
