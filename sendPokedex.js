const Pokedex = require("./pokedex.js");

module.exports = (interface, cardFoundIds) => {
    interface.send({embeds: [new Pokedex(cardFoundIds, 0), new Pokedex(cardFoundIds, 1)]});
}