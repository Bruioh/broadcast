const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMembers, 
        GatewayIntentBits.MessageContent, 
        GatewayIntentBits.GuildMessages 
    ]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
    if (message.content.startsWith('$broadcast')) {
        const broadcastMessage = message.content.slice(11);

        message.guild.members.fetch().then(members => {
            members.forEach(member => {
                if (!member.user.bot) {
                    member.send(broadcastMessage).catch(error => {
                        console.log(`تعذر إرسال الرسالة إلى ${member.user.tag}: ${error}`);
                    });
                }
            });
        });
    }
});

client.login('');