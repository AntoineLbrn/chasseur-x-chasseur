const Discord = require("discord.js");
const { MessageActionRow, MessageButton, Intents } = require('discord.js');
const config = require("./config.js");
const enigmesTab = require("./enigmes");
var bot = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES], partials: ['MESSAGE', 'CHANNEL', 'REACTION', "USER", "GUILD_MEMBER"]  });

const enigmesMap = new Map(enigmesTab)

bot.on("messageCreate", async (message) => {
    //console.log(message)
    if (bot.channels.cache.find(channel => channel.name === "general") && message.author != bot.user) {
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('start_dm')
                .setLabel('Clique sur moi !')
                .setStyle('PRIMARY'),
        );
        message.channel.send({content: 'Appuie', components: [row]});
    }

    if (message.guildId === null && message.author != bot.user) {
        const msgTab= message.content.split(" ")
        const num_enigme = parseInt(msgTab[0])
    
        if (isNaN(num_enigme))
            message.author.send("Erreur num enigmes pas chiffre");
        else if (num_enigme > enigmesMap.size || num_enigme < 0)
            message.author.send(`Erreur num enigmes 0 ${enigmesMap.size}`);
        else
            message.author.send(enigmesMap.get(num_enigme).question);
    }
});

bot.on('interactionCreate', interaction => {
	if (!interaction.isButton()) return;
    if (!interaction.customId==="start_dm") return;
	interaction.user.send("test")
});

bot.login(config.BOT_TOKEN);
