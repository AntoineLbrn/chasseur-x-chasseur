const Discord = require("discord.js");
const { MessageActionRow, MessageButton, Intents } = require('discord.js');
const config = require("./config.js");
const enigmesTab = require("./enigmes");
const sendCard = require("../sendCard");
const sendCollection = require("../sendCollection");
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
        message.channel.send({content: 'Pour commencer le jeu, appuie sur ce bouton !', components: [row]});
    }

    // Collection
    if (message.author.id != bot.user.id && message.guildId === null && message.content.toUpperCase() === "COLLECTION") {
        queryCollection(message.author.id, clientPg).then((res => {
            //console.log(res)
            sendCollection(message.author, res.map(row => row.card_number));
        })).catch((error) => {
            message.author.send("Une erreur inconnue s'est produite, ressaye !")
        });
        return
    }
    
    // Answer via DM, parses string of the message to identify the n° of the question and the answer
    if (message.guildId === null && message.author != bot.user && message.content.toUpperCase() != "COLLECTION" ) {
        const msgTab= message.content.split(" ")
        if (msgTab.length != 2) {
            message.author.send('Je n\'ai pas bien compris, ton message n\'est pas sous la forme "n°question réponse".')
            return;
        }

        const num_enigme = parseInt(msgTab[0])
    
        if (isNaN(num_enigme))                                      // Pour filtrer si ce n'est pas un nombre entier
            message.author.send("Je n\'ai pas bien compris, le numéro de l'énigme n'est pas un nombre.");
        else if (num_enigme > enigmesMap.size || num_enigme <= 0)    // Pour filtrer si ce n'est pas un n° valide de question
            message.author.send(`Je n\'ai pas bien compris, le numéro de l'énigme n'est pas entre 1 et ${enigmesMap.size}.`);
        else if (enigmesMap.get(num_enigme).answers.indexOf(msgTab[1].toUpperCase()) > -1) { // Vérifie si la réponse est conforme au numéro de la question
            insertRow(message.author.id, num_enigme).then((res => {
                message.author.send("C'est ça ! Tu as obtenu ce personnage :");
                sendCard(message.author, enigmesMap.get(num_enigme));
            })).catch((error) => {
                if (error.constraint === "collection_pkey") {
                    message.author.send(CUSTOM_ERROR.CARD_ALREADY_ACQUIRED);
                }
            });
        }   
        else
            message.author.send("Malheureusement ce n'est pas la bonne réponse... :'(")
    }
});


// Button interaction to send DM at the user
bot.on('interactionCreate', interaction => {
	if (!interaction.isButton()) return;
    if (!interaction.customId==="start_dm") return;
	interaction.user.send("C'est ici que tout va se passer !")
});

bot.login(config.BOT_TOKEN);