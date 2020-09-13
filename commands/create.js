/* eslint-disable no-unused-vars */
module.exports = {
    name: 'create',
    description: 'Create A Character!',
    execute(message, args) {

        message.channel.send('What class would you like to be?\n⚔️ for Warrior\n🏹 for Archer\n🦄 for Mage\n🔫 for Musketeer').then(m => {
            m.react('⚔️');
            m.react('🏹');
            m.react('🦄');
            m.react('🔫');
        });

    },
};
