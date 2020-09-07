module.exports = {
    name: 'ping',
    description: 'Ping Command',
    execute(message, args) {
       message.channel.send('Pinging...').then(m => {
           let ping = m.createdTimestamp - message.createdTimestamp;

           m.edit(`**:ping_pong: Pong! Your Ping Is:-**\n  ${ping}ms`);

       });
    },
};
