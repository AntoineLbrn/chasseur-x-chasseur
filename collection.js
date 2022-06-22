const { MessageEmbed } = require('discord.js');
const enigmes = require('./src/enigmes');

const computeFields = (cardFoundIds, pageNumber) => {
    return enigmes.slice(pageNumber*25).map((enigme) => {
        return {
            name: '#' + enigme[1].id + " " + (cardFoundIds.includes(enigme[1].id) ? enigme[1].name : '???'),  value: cardFoundIds.includes(enigme[1].id) ? '✅.' : '❌.', inline: true
        }
    })
}

/**
 * There are two pages : 0 and 1
 */
module.exports = class Collection extends MessageEmbed {
    constructor(cardFoundIds, pageNumber) {
        const fields = computeFields(cardFoundIds, pageNumber);
        return super()
            .setColor('#FADCDC')
            .setTitle('Votre ChasseurDex')
            .setDescription("Vous avez " + cardFoundIds.length + " cartes sur " + enigmes.length + ".")
            .addFields(fields);
    }

}