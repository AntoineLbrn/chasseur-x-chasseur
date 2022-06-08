const Discord = require("discord.js");
const { MessageActionRow, MessageButton, Intents } = require('discord.js');
const config = require("./config.js");
const enigmesTab = require("./enigmes");
const insertRow = require("./insertRow.js");
const sendCard = require("./useCase/sendCard.js");
const sendPokedex = require("./useCase/sendPokedex.js");
var bot = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES], partials: ['MESSAGE', 'CHANNEL', 'REACTION', "USER", "GUILD_MEMBER"]  });

const enigmesMap = new Map(enigmesTab)

// Message in DM or in "general" channel
bot.on("messageCreate", async (message) => {
    //console.log(message)

    // Start button
    if (message.channelId === '983354993279119433' && message.author.id != bot.user.id) {
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('start_dm')
                .setLabel('Clique sur moi !')
                .setStyle('PRIMARY'),
        );
        message.channel.send({content: 'Appuie', components: [row]});
    }

    // Answer via DM, parses string of the message to identify the n° of the question and the answer
    if (message.guildId === null && message.author != bot.user) {
        const msgTab= message.content.split(" ")
        if (msgTab.length != 2) {
            message.author.send('Pas dans la forme  "question réponse"')
            return;
        }

        const num_enigme = parseInt(msgTab[0])
    
        if (isNaN(num_enigme))                                      // Pour filtrer si ce n'est pas un nombre entier
            message.author.send("Erreur num enigmes pas chiffre");
        else if (num_enigme > enigmesMap.size || num_enigme < 0)    // Pour filtrer si ce n'est pas un n° valide de question
            message.author.send(`Erreur num enigmes entre 0 et ${enigmesMap.size}`);
        else if (enigmesMap.get(num_enigme).answers.indexOf(msgTab[1]) > -1) { // Vérifie si la réponse est conforme au numéro de la question
            // TODO: INSERT INTO TABLE COLLECTION
            sendCard(message.author, enigmesMap.get(num_enigme));
            sendPokedex(message.author, [1,2]);
        }   
        else
            message.author.send("Mauvaise réponse :(")
    }
});

// Button interaction to send DM at the user
bot.on('interactionCreate', interaction => {
	if (!interaction.isButton()) return;
    if (!interaction.customId==="start_dm") return;
	interaction.user.send("test")
    interaction.reply("Merci !")
});

bot.login(config.BOT_TOKEN);