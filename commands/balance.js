const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const { mongoPass } = require('../config.json');

mongoose.connect(mongoPass, {
    userNewYrlParser: true,
    useUnifiedTopology: true,
});

const Coins = require('../models/coins.js');

module.exports = {
    name: 'bal',
    aliases: 'balance',
    description: 'Check how many coins you or someone else has',
    execute(message, args) {

message.delete();

const embed = new MessageEmbed()
  .setTitle('Coins')
  .setThumbnail(message.author.displayAvatarURL);

Coins.findOne({
  userID: message.author.id,
  serverID: message.guild.id,
}, (err, res) => {
  if (err) console.log(err);

  if (!res) {
    embed.setColor('RED');
    embed.addField('Error', 'Sorry, you don\'t have any coins in this server...');
  } else {
    embed.setColor('BLURPLE');
    embed.addField(res.username, res.coins + ' coins.');
  }

  message.channel.send(embed);

});
    },


};
