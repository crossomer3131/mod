const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const db = new qdb.table("ayarlar");
const ayar = require('../ayarlar.json');

// module.exports.onLoad = (client) => {}
module.exports.execute = (client, message, args, ayar, emoji) => {

  const embed = new MessageEmbed()
  .setColor('BLUE')
  message.channel.send(embed
.setDescription(`Ses kanallarında toplam **${(`${message.guild.channels.cache.filter(channel => channel.type == "voice").map(channel => channel.members.size).reduce((a, b) => a + b)}`)}** Üye bulunmakta
`)
.setThumbnail('https://images-ext-2.discordapp.net/external/qSYAi3TrLZ6Yba7_9d9Lhqt7EGa-Cc_9VRzhcPtxfNE/https/media.giphy.com/media/kFNMddkQQKds2mVMbI/giphy.gif')); 
};

module.exports.configuration = {
    name: "seslisay",
    aliases: ["sesli"],
    usage: "seslisay",
    description: "Sunucu sayımı."
};