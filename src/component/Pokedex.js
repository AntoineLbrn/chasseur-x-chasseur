const { MessageEmbed } = require('discord.js');
const enigmes = require('../enigmes');

const computeFields = (cardFoundIds) => {
    return enigmes.map((enigme) => {
        return {
            name: '#' + enigme[1].id,  value: cardFoundIds.includes(enigme[1].id) ? '✅' : '❌', inline: true
        }
    })
}

module.exports = class Pokedex extends MessageEmbed {
    constructor(cardFoundIds) {
        const fields = computeFields(cardFoundIds);
        return super()
            .setColor('#FADCDC')
            .setTitle('Votre ChasseurDex')
            .setDescription("Vous avez " + cardFoundIds.length + " cartes sur " + enigmes.length + ".")
            .addFields(fields);
    }

}