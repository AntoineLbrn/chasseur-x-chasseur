const Discord = require("discord.js");
const { MessageActionRow, MessageButton, Intents } = require('discord.js');
const config = require("./config.js");
const enigmesTab = require("./enigmes");
const sendCard = require("../sendCard");
const sendPokedex = require("../sendPokedex");
const insertRow = require("./insertRow.js");
const queryCollection = require("./queryCollection.js");
const clientPg = require("./clientPg.js");
const CUSTOM_ERROR = require("./customErrors");
var bot = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES], partials: ['MESSAGE', 'CHANNEL', 'REACTION', "USER", "GUILD_MEMBER"]  });

const enigmesMap = new Map(enigmesTab)
const { Pool } = require('pg')
const pool = new Pool()
clientPg.connect()


// Message in DM or in "general" channel
bot.on("messageCreate", async (message) => {
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

    // Pokedex
    if (message.author.id != bot.user.id && message.guildId === null && message.content === "pokedex") {
        queryCollection(message.author.id, clientPg).then((res => {
            console.log(res)
            sendPokedex(message.author, res.map(row => row.card_number));
        })).catch((error) => {
            message.author.send("Une erreur inconnue s'est produite. Va voir un·e anim. stv. ou réessaie.")
        });
        return
    }
    
    // Answer via DM, parses string of the message to identify the n° of the question and the answer
    if (message.guildId === null && message.author != bot.user && message.content != "pokedex" ) {
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
        else if (enigmesMap.get(num_enigme).answers.indexOf(msgTab[1].toUpperCase()) > -1) { // Vérifie si la réponse est conforme au numéro de la question
            // TODO: INSERT INTO TABLE COLLECTION
            insertRow(message.author.id, num_enigme).then((res => {
                message.author.send("GG");
                sendCard(message.author, enigmesMap.get(num_enigme));
            })).catch((error) => {
                if (error.constraint === "collection_pkey") {
                    message.author.send(CUSTOM_ERROR.CARD_ALREADY_ACQUIRED);
                }
            });
            // sendCard(message.author, enigmesMap.get(num_enigme));
            // sendPokedex(message.author, [1,2]);
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