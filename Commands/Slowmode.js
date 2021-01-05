const { MessageEmbed } = require("discord.js");

module.exports.execute = async(client, message, args, ayar, emoji) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu Komutu Kullanmak İçin Yeterli Yetkin Yok!`)
if (message.channel.type !== "text") return;
const limit = args[0] ? args[0] : 0;
  if(!limit) {
              var embed = new MessageEmbed()
                .setDescription(`Doğru Kullanım: \`!slowmode <sure>\``)
                .setColor('RANDOM')
                .setTimestamp()
            message.channel.send({embed})
            return
          }
if (limit > 9999999999) {
    return message.channel.send(new MessageEmbed().setDescription(" Süre Limiti Makisimum **9999999999** Saniye Olabilir!").setColor('RANDOM'));
}
    message.channel.send(new MessageEmbed().setDescription(`Yavaş Mod **${limit}** Saniye Olarak Ayarlandı!`).setColor('RANDOM')).then(msg => msg.delete(5000));
var request = require('request');
request({
    url: `https://discordapp.com/api/v7/channels/${message.channel.id}`,
    method: "PATCH",
    json: {
        rate_limit_per_user: limit
    },
    headers: {
        "Authorization": `Bot ${client.token}`
    },
})};
module.exports.configuration = {
  name: "slomode",
  aliases: ["slowmode","yavaşmod"],
  usage: "slomode",
  description: "Belirtilen üyeyi süreli muteler."
};
