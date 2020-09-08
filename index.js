const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const { prefix, token, mongoPass } = require('./config.json');

const mongoose = require('mongoose');
mongoose.connect(mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const Coins = require('./models/coins.js');

client.once('ready', () => {
    console.log('Ready!');
    console.log(`My Prefix Is ${prefix}`);
    console.log(`My Token Is ${token}`);
});

for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('message', message =>{

    if(!message.content.startsWith(prefix) || message.author.bot) {

        const chance = Math.floor(Math.random() * 100) + 1;
        console.log(chance + ' ' + message.content);
    if (chance > 75) {
      // here is where the coins are added.

      const coinstoadd = Math.ceil(Math.random() * 10) + 5;

      Coins.findOne({
        userID: message.author.id,
        serverID: message.guild.id,
      }, (err, res) => {
        if(err) console.log(err);

        if(!res) {
          const newDoc = new Coins({
            userID: message.author.id,
            username: message.author.username,
            serverID: message.guild.id,
            coins: coinstoadd,
          });
          newDoc.save().catch(err => console.log(err));
        }
else{
          res.coins = res.coins + coinstoadd;
          res.save().catch(err => console.log(err));
        }
      });
    }

    }
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if(!client.commands.has(command)) return;
    try{
        client.commands.get(command).execute(message, args);
    }
 catch(error) {
        console.error(error);
        message.reply('Something has happened, contact muffin!');
    }

});

client.login(token);
