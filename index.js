const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const { prefix, token } = require('./config.json');

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

    if(!message.content.startsWith(prefix) || message.author.bot) return;
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