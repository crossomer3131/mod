const { MessageEmbed } = require('discord.js')
const data = require('quick.db')

 module.exports.execute = async (client, message, args, ayar, emoji) => {
    const emirhan = await data.fetch(`snipe.id.${message.guild.id}`)
    if(!emirhan) {
    const embeds = new MessageEmbed()
  .setAuthor(client.user.username, client.user.avatarURL())
  .setDescription(`Mesaj bulunamadı!`)
.setColor(`#f3c7e1`)
    message.channel.send(embeds);
          } else {
  let kullanıcı = client.users.cache.get(emirhan);
  const silinen = await data.fetch(`snipe.mesaj.${message.guild.id}`)
  const embed = new MessageEmbed()
  .setAuthor(kullanıcı.username, kullanıcı.avatarURL())
  .setDescription(`Silen : <@!${kullanıcı.id}> 
  Silinen mesaj: ` + silinen)
.setColor(`#f3c7e1`)
  message.channel.send(embed) }
}
module.exports.configuration = {
  name: "snipe",
  aliases: [],
  usage: "snipe",
  description: "Belirtilen üyeyi süreli muteler."
};
