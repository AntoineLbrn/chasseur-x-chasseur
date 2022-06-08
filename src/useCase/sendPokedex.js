const Pokedex = require('../component/pokedex');


module.exports = (interface, cardFoundIds) => {
    interface.send({embeds: [new Pokedex(cardFoundIds)]});
}