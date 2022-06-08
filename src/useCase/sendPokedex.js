const Pokedex = require('../component/Pokedex');


module.exports = (interface, cardFoundIds) => {
    interface.send({embeds: [new Pokedex(cardFoundIds)]});
}