const { MessageEmbed } = require('discord.js');

module.exports = class Card extends MessageEmbed {
    constructor(card) {
        return super()
            .setColor('#0099ff')
            .setTitle('#' + card.id + ' - ' + card.name)
            .setDescription(card.description)
            .setImage(card.url)
            .setFooter({ text: 'Rareté : ' + card.rarity});
    }
}